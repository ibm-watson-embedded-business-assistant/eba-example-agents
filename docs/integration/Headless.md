## Headless Integration

It is possible to connect to EBA in headless mode. You can review a [working example](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/tree/master/samples/websocket-node-client). This example demonstrates a web-socket based connection to EBA for a command line application. Following this example, you should be able to ask Watson questions from your terminal just like you would from our web application.

The steps required for integration are as follows:
1. Generating an access_token used and connecting to your session using your headless client
2. Implementing async interaction logic within your client to communicate with Watson

### An illustration

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

Here we have established some initial settings and claims, where we have supplied the values taken from Lab Settings. Note that `key` here refers to the file path containing your private key. Following this, we use npm's `jsonwebtoken` module to sign our key appropriately. Once we have our access_token, we pass it into our start function to . 

When the promise above resolves, i.e. when the websocket connection is opened, we execute a function called `interact`.

```
function interact() {
    rl.question('', (text) => {
        client.ask(text)
        _.defer(interact)
    })
}
```

Using node's native readline utility, this function waits for the user to input a question to the terminal. Once the user has provided a question, the callback function is executed, which sends th- e question as data to EBA over our web socket connection. It then calls `defer` on the same interact function, meaning that it intends to interact with the user again for another question but only once the call stack from the current question is completed. This is a convenient illustration of how to handle asynchronous communication with EBA to hold a conversation.

### Client api reference
Having this illustration in mind, we here outline the api exposes by our client:

- `start` -- this function will create and connect the client to a session. From here the client is able to post questions and hold a conversation with EBA. This function requires an `access_token`, which is a signed JWT of your session claims.
- `ask`  -- this function will post a question to EBA. It text as a `String` input representing the user's input.
- `on`   -- a generic event handler for intercepting EBA events. Currently, we support two events, viz. `message` and `log`.
- `stop` -- this function will terminate your connection to EBA and logout.

EBA currently supports the following events:

- `message` -- event provides user's with EBA's response to a question. Depending on the particular implementation, this may be either a primitive textual response or else an object which containing the fields `{data, name, text}`. 

- `log` -- event contains event logs of the client itself, signifying state of your connection.
