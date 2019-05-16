## Headless integration

It is possible to connect to EBA in headless mode. You can review a [working example](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/tree/master/samples/websocket-node-client). This example demonstrates a web-socket based connection to EBA for a command line application. Following this example, you should be able to ask EBA questions from your terminal just like you would from our web application.

The steps required for integration are as follows:
1. Generating an access_token used and connecting to your session using your headless client
2. Implementing async interaction logic within your client to communicate with EBA

### An illustration

In order to generate an access token, please visit our [settings page](https://eba.ibm.com/assistant#/lab/settings) to get started. You will find an `iss` and `sub` claims, as well as instructions for generating private and public keys. As mentioned within our documentation, please store your private key within a secure location and do not share it with anyone. Having obtained these required data elements, lets take a look at how you can generate an access token programmatically within your headless client.

```
let eba = require('eba-client')

let settings = {
    url: 'https://eba.ibm.com/',
    key: 'private_key.pem',
    iss: 'https://your-authentication-url.example.com',
    sub: 'john.doe@example.com',
    name: 'John Doe'
}

let client = new eba.Client(settings.url)

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

Here we have established some initial settings and claims, where we have supplied the values taken from Lab Settings. Note that `key` here refers to the file path containing your private key. Following this, we use npm's `jsonwebtoken` module to sign our key appropriately. Once we have our access_token, we pass it into our start function to . See more information on [JSON web tokens](https://jwt.io/introduction/)

When the promise above resolves, i.e. when the websocket connection is opened, we execute a function called `interact`.

```
function interact() {
    rl.question('', (text) => {
        client.ask(text)
        _.defer(interact)
    })
}
```

Using node's native readline utility, this function waits for the user to input a question to the terminal. Once the user has provided a question, the callback function is executed, which sends the question as data to EBA over our web socket connection. It then calls `defer` on the same interact function, meaning that it intends to interact with the user again for another question but only once the call stack from the current question is completed. This is a convenient illustration of how to handle asynchronous communication with EBA to hold a conversation.

After sending our question via `client.ask`, we anticipate the response using an event handler. In particular, we await EBA's response to our question in `client.on('message')` as well as any client activity logs in `client.on('log')`. Because this particular application models a command interface chat, our use of `console.log` will output EBA's response to the user's terminal to form a dialog. With our `interact` function in place, we will be able to continue a dialog with the user indefintely via standard input and output.

```
// listen for messages
client.on('message', (message) => {
    console.log(message)
})

// listen for logs
client.on('log', (text) => {
    console.log(text)
})
```

### Client API reference
Having this illustration in mind, we here outline the api exposes by our client:

- `start` -- this function will create and connect the client to a session. From here the client is able to post questions and hold a conversation with EBA. This function requires an `access_token`, which is a signed JWT of your session claims.
- `ask`  -- this function will post a question to EBA. It takes a `String` parameter representing the user's input.
- `on`   -- a generic event handler for intercepting EBA events. Currently, we support two events, viz. `message` and `log`.
- `stop` -- this function will terminate your connection to EBA and logout.

EBA currently supports the following events:

- `message` -- event providing user's with EBA's response to a question. This may be either a primitive textual response or, in the event that there is underlying data associated with a response, an object containing the fields `{data, name, text}`. 

- `log` -- event containing event logs of the client module itself, signifying the state of your connections or any other client activity, e.g. 'connected'.

Regarding the initial session claims used within the jwt `access_token`. We currently support the following public claim fields:

- `name`
- `email`
- `locale`
- `zoneinfo`
- `given_name`
- `family_name`
- `middle_name`

You can find more information at [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml)
