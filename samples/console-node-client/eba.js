const _ = require('lodash')
const http = require('http')
const util = require('util')
const request = require('request')
const EventEmitter = require('events')

class Client extends EventEmitter {
    constructor(url = 'https://eba.ibm.com') {
        super()
        const api = request.defaults({
            jar: true,
            baseUrl: `${url}/`,
            headers: { referer: `${url}/` }
        })
        this.api = (options) => {
            return new Promise((resolve, reject) => {
                api(options, (error, response, body) => {
                    if (error) reject(error)
                    else resolve({
                        statusCode:    response.statusCode,
                        statusMessage: response.statusMessage,
                        headers:       response.headers,
                        body:          body
                    })
                })
            })
        }
        this.data = {}
        this._requestState()
    }

    login(auth = 'expo/login') {
        return this.api(auth)
            .then((response) => {
                if (response.statusCode != 200)
                    throw response.statusMessage
                return response
            })
    }

    logout() {
        return this.api('logout')
    }

    ask(text) {
        return this.api({
            uri: 'ask',
            form: { message: text },
            method: 'POST'
        })
    }

    _applyAction(data, action) {
        const process = (plural, singular) => {
            _.forEach(action[plural], (x) => {
                if (x[1] != null) {
                    if (x[1].seqn == -1)
                        x[1].seqn = data.seqn
                    data[plural][x[0]] = x[1]
                    data.seqn += 1
                    this.emit(`${singular}-added`, x[0], x[1])
                }
                else {
                    delete data[plural][x[0]]
                    this.emit(`${singular}-removed`, x[0])
                }
            })
        }
        process('nodes', 'node')
        process('links', 'link')
        return data
    }

    _applyActions(data, actions) {
        _.reduce(actions, this._applyAction.bind(this), data)
        data.version += 1
        return data
    }

    _patchState(data, patch) {
        return _.reduce(patch, this._applyActions.bind(this), data)
    }

    _requestState() {
        this.api({uri: 'state', qs: { version: this.data.version, sessionId: this.data.sessionId }})
            .then((response, body) => {
                if (response.statusCode == 200) {
                    var data = JSON.parse(response.body)
                    if (_.isArray(data))
                        data = this._patchState(this.data, data)
                    else {
                        const process = (plural, singular) => {
                            _(data[plural])
                                .toPairs()
                                .sortBy((x) => x[1].seqn)
                                .forEach((x) => this.emit(`${singular}-added`, x[0], x[1]))
                        }
                        process('nodes', 'node')
                        process('links', 'link')
                    }
                    this.data = data
                    setTimeout(this._requestState.bind(this), 0)
                }
                else
                    setTimeout(this._requestState.bind(this), 1000)
            })
            .catch((error) => {
                console.warn(error)
                setTimeout(this._requestState.bind(this), 1000)
            })
    }
}

exports.Client = Client
