const _ = require('lodash')
const request = require('request-promise')
const WebSocket = require('websocket').w3cwebsocket
const EventEmitter = require('events')

class Client extends EventEmitter {

    constructor(url = 'https://eba.ibm.com/') {
        super()

        this.url = url
        this.jar = request.jar()
        this.session = null
        this.version = 0
        this.api = request.defaults({
            jar: this.jar,
            json: true,
            baseUrl: url,
            headers: { referer: url },
            // debugging...
            // transform: (body, response, resolveWithFullResponse) => {
            //     console.log(response.headers)
            //     return body
            // }
        })
        this.started = false
        this.stopped = false
        this.connected = false
    }

    _isMessage(node) {
        return node &&
            node.name == 'message' &&
            node.data &&
            node.data.content &&
            _.includes(node.tags, 'selected')
    }

    _log(text) {
        this.emit('log', text)
    }

    _force(data) {
        if (_.isObject(data) && data.kind == 'genericLazyData') {
            return this.api.get({
                uri: 'data/query',
                qs: { query: JSON.stringify(data) },
                headers: { 'x-cca-sessionid': this.sessionId }
            })
        } else {
            return data
        }
    }

    async _handleNode(node) {
        if (this._isMessage(node)) {
            let content = node.data.content
            if (_.isString(content)) {
                let message = { text: content }
                this.emit('message', message)
            }

            if (_.isObject(content)) {
                let message = {}
                if (!_.isNil(content.text))
                    message.text = content.text
                if (!_.isNil(content.data))
                    message.data = await this._force(content.data)
                if (!_.isNil(content.name))
                    message.name = content.name
                this.emit('message', message)
            }
        }
    }

    async _handleMessages(messages) {
        for (let message of messages) {

            if (message.name == 'working')
                this._log(`working: ${message.status}`)

            if (message.name == 'state') {
                for (let node of _.sortBy(_.values(message.state.nodes), ({seqn}) => seqn)) {
                    if (node && node.data && node.data.version > this.version)
                        await this._handleNode(node)
                }
                this.version = message.state.version
            }

            if (message.name == 'patch') {
                for (let action of message.patch) {
                    for (let {nodes} of action) {
                        for (let [nodeId, node] of nodes) {
                            if (this._isMessage(node))
                                await this._handleNode(node)
                        }
                    }
                    this.version += 1
                }
            }
        }
    }

    _connect() {
        return new Promise((resolve, reject) => {
            let headers = {
                referer: this.url,
                cookie: this.jar.getCookieString(this.url)
            }

            let url = `${this.url.replace(/^http(s?):/, (txt, tls) => `ws${tls}:`)}ws/${this.session}`

            this.socket = new WebSocket(
                url,
                null,
                this.url.slice(0,-1),
                headers,
                null,
                { maxReceivedFrameSize: 1024*1014*10 })

            this.socket.onopen = connection => {
                this.connected = true
                this._log("websocket opened")
                resolve(connection)
            }

            this.socket.onclose = ({reason}) => {
                this.connected = false
                this._log(`websocket closed: ${reason}`)
                if (!this.stopped)
                    this.timer = setTimeout(() => this._connect().catch(() => {}), 10000)
            }

            this.socket.onerror = (socket) => {
                this._log(`websocket failed`)
                reject(socket)
            }

            this.socket.onmessage = (e) => {
                if (_.isString(e.data)) {
                    let messageData = JSON.parse(e.data)
                    this._handleMessages(messageData.name == 'many'
                        ? _.map(messageData.messages, JSON.parse)
                        : [messageData]
                    )
                }
            }
        })
    }

    start(config) {
        this._log("logging in...")
        this.request = this.api({
            uri: 'assistant/setup',
            body: config,
            json: true,
            method: 'POST'
        })
        this.request.then(({session}) => {
            if (!this.stopped) {
                this.session = session
                this.started = true
                this._log(`session started: ${session}`)
                this._log("opening websocket...")
                return this._connect()
            }
            else
                throw "client is stopped"
        })
        return this.request
    }

    stop() {
        this._log('logging out...')
        this.stopped = true
        if (this.timer)
            clearTimeout(this.timer)
        if (this.request)
            this.request.abort()
        if (this.socket)
            this.socket.close()
        if (this.started)
            this.api({ uri: 'assistant/logout' })
    }

    ask(question) {
        try {
            let message = { name: 'ask', question }
            this.socket.send(JSON.stringify(message))
        }
        catch (error) {
            this._log(`send failed: ${error}`)
        }
    }
}

module.exports.Client = Client
