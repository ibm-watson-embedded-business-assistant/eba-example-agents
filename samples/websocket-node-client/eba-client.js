const _ = require('lodash')
const request = require('request-promise')
const WebSocket = require('websocket').w3cwebsocket
const EventEmitter = require('events')

function extractMessageData(actions) {
    return _.flatMap(actions, ({nodes, links}) =>
        _.flatMap(nodes, ([nodeId, node]) =>
            (node && node.name == 'message' && node.tags.indexOf('selected') != -1 && node.data && node.data.content)
                ? [node.data.content]
                : []
        )
    )
}

class Client extends EventEmitter {
    constructor(url) {
        super()

        this.url = url
        this.jar = request.jar()
        this.sessionId = null
        this.seqn = -1
        this.api = request.defaults({
            jar: this.jar,
            json: true,
            baseUrl: url,
            headers: { referer: url }
        })
        this.started = false
        this.stopped = false
        this.connected = false
    }

    _log(text) {
        this.emit('log', text)
    }

    _force(data) {
        if (data && data.kind == 'genericLazyData') {
            return this.api.get({
                uri: 'data/query',
                qs: {
                    query: JSON.stringify(data)
                },
                headers: {
                    'x-cca-sessionid': this.sessionId
                }
            })
        } else {
            return data
        }
    }

    async _handleMessages(messages) {
        for (let message of messages) {
            var actions = []

            if (message.name == 'working')
                this._log(`working: ${message.status}`)

            if (message.name == 'state') {
                let {nodes, links} = message.state
                let action = {
                    nodes: _.sortBy(_.toPairs(nodes), ([id, {seqn}]) => seqn),
                    links: _.sortBy(_.toPairs(links), ([id, {seqn}]) => seqn)
                }
                actions = [action]
            }

            if (message.name == 'patch') {
                actions = _.flatten(message.patch)
            }

            for (let content of extractMessageData(actions)) {
                if (_.isString(content)) {
                    this.emit('message', {
                        text: content
                    })
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
    }

    _connect(sessionId) {
        this.sessionId = sessionId

        return new Promise((resolve, reject) => {
            let headers = {
                referer: this.url,
                cookie: this.jar.getCookies(this.url).toString()
            }

            let url = `${this.url.replace(/^http(s?):/, (txt, tls) => `ws${tls}:`)}ws/${sessionId}`

            this.socket = new WebSocket(url, null, this.url.slice(0, -1), headers)

            this.socket.onopen = connection => {
                this.connected = true
                this._log("websocket opened")
                resolve(connection)
            }

            this.socket.onclose = ({reason}) => {
                this.connected = false
                this._log(`websocket closed: ${reason}`)
                if (!this.stopped)
                    this.timer = setTimeout(this._connect.bind(this), 10000)
            }

            this.socket.onerror = (error) => {
                this._log(`websocket failed: ${error}`)
                reject(error)
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
                this.started = true
                this._log(`session started: ${session}`)
                this._log("opening websocket...")
                return this._connect(session)
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
