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
        this.api = request.defaults({
            jar: this.jar,
            json: true,
            baseUrl: url,
            headers: { referer: url }
        })
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
            if (message.name == 'patch') {
                for (let content of _.flatMap(message.patch, extractMessageData)) {
                    if (_.isString(content)) {
                        this.emit('message', content)
                    }

                    if (_.isObject(content)) {
                        let data = await this._force(content.data)
                        this.emit('message', {
                            text: content.text,
                            data: data,
                            name: content.name
                        })
                    }
                }
            }
        }
    }

    _connect(session) {
        this.sessionId = session.id

        let headers = {
            referer: this.url,
            cookie: this.jar.getCookies(this.url).toString()
        }

        let wsUrl = this.url.replace('https:', 'wss:').replace('http:', 'ws:')

        return new Promise((resolve, reject) => {
            this.socket = new WebSocket(`${wsUrl}ws/${session.id}`, null, this.url.slice(0, -1), headers)

            this.socket.onerror = reject

            this.socket.onopen = resolve

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

    login(path, params) {
        return this
            .api({
                uri: path,
                qs: params,
                method: 'GET'
            })
            .then(() => this.api({
                uri: 'session',
                method: 'POST'
            }))
            .then(session =>
                this._connect(session)
            )
    }

    ask(question) {
        this.socket.send(JSON.stringify({ name: 'ask', question }))
    }
}

module.exports.Client = Client
