## Headless Integration

It is possible to connect to EBA in headless mode. You can review a [working example](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/tree/master/samples/websocket-node-client). This example demonstrates a web-socket based connection to EBA for a command line application. Following this example, you should be able to ask Watson questions from your terminal just like you would from our web application.

The steps required for integration are as follows:
1. Generating an access_token used and connecting to your session using your headless client
2. Implementing async interaction logic within your client to communicate with Watson

### Connecting to EBA

In order to generate an access token, please visit our [settings page](https://eba.ibm.com/assistant#/lab/settings) to get started. You will find an `iss` and `sub` claims, as well as instructions for generating private and public keys. As mentioned within our documentation, please store your private key within a secure location and do not share it with anyone. Having obtained these required data elements, lets take a look at how you can generate an access token programmatically within your headless client.

```
const settings = {
    url: 'https://eba.ibm.com/',
    key: 'private_key.pem',
    iss: 'https://your-authentication-url.example.com',
    sub: 'john.doe@example.com',
    name: 'John Doe'
}

let claims = {
    iss: settings.iss,
    sub: settings.sub,
    name: settings.name
}

let access_token = jwt.sign(claims, fs.readFileSync(settings.key), { algorithm: 'RS256' })

client
    .start({ access_token })
    ...

```

Here we have established some initial settings and claims, where we have supplied the values taken from Lab Settings. Note that `key` here refers to the file path containing your private key. Following this, we use npm's `jsonwebtoken` module to sign our key appropriately. Once we have our access_token, we pass it into our start handler which posts a request to our setup end point containing the supplied token. It is now time to connect to our session.

```
_connect(sessionId) {
        this.sessionId = sessionId

        let headers = {
            referer: this.url,
            cookie: this.jar.getCookies(this.url).toString()
        }

        let wsUrl = this.url.replace('https:', 'wss:').replace('http:', 'ws:')

        return new Promise((resolve, reject) => {
            this.socket = new WebSocket(`${wsUrl}ws/${sessionId}`, null, this.url.slice(0, -1), headers)

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
```

Here we establish a web socket connection to our eba url. We set the appropriate sessionId, headers, and url to create a web socket connection as well as the appropriate handlers for open, error, and message events. We are now ready to interact with Watson and handle messages.

### Interacting with EBA

When the promise above resolves, i.e. when the websocket connection is opened, we execute a function called `interact`.

```
function interact() {
    rl.question('', (text) => {
        client.ask(text)
        _.defer(interact)
    })
}
```

Using node's native readline utility, this function waits for the user to input a question to the terminal. Once the user has provided a question, the callback function is executed, which sends the question as data to EBA over our web socket connection. It then calls `defer` on the same interact function, meaning that it intends to interact with the user again for another question but only once the call stack from the current question is completed. This is a convenient illustration of how to handle asynchronous communication with EBA. 

When Watson responds with its own data to the client, it will run through the message handler we have assigned above.

```
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
```

Here we effectively check the name of the data as well as its type. If it is a string, we simply emit the string. If it is an object, we supply a json contextual representation on top of it. Note that `this.emit('message',...)` is a separate message event handler attached to our client object (not its websocket connection). This handler simply logs the result back to the console (it is a command line application after all). At this point, the user may continue to interact or else kill the connection.
