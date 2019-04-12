## Render Endpoint

Watson Assistant can provide native rendering for a few popular communication channels. Currently, we support Slack and Watson Workspace. The rendering format is, of course, dependent upon the api exposed by such channels. Be advised that Watson Assistant already has a default mechanism for rendering messages in such channels. By default, Watson will take a clickable snapshot of the original message that would otherwise be rendered within our web application and post it as an image link to the channel. Within the channel, this message can be clicked to engage into a full view of the message data. You should consider using the render endpoint if you desire to override this default behavior by using the native formatting provided by a particular channel. Within the endpoint, you will have the following information supplied as input:
- channel -- the name of the channel, so you can render appropriately for each
- message -- a node contains the natural language text, concept name and the that data to be rendered

If node data size exceeds certain limit it maybe be represented as lazy data. The best way to handle such cases is to use the helper function which will request the actual node data in the case it's represented as lazy data.

Slack Example:

```
const eba = require('eba')

async function render(channel, h) {
    if (channel == 'slack') {
        if (h.getName('message') == 'wmt:Products') {
            let data = await h.get('message')
            let attachments = data.map(renderProduct)
            return {
                text: h.getMeta('message').text,
                attachments: attachments
            }
        }
    
        if (h.getName('message') == 'wmt:Product') {
            let data = await h.get('message')
            return {
                text: h.getMeta('message').text,
                attachments: [renderProduct(data)]
            }
        }
    }
}

module.exports.main = async function (params) {
    let result = await render(params.input.channel, new eba.Params(params))
    if (result) {
        return { output: result }
    } else {
        return {}
    }
}
```

For full documentation and interactive explorer on Slack's message format, consult their [official docs](https://api.slack.com/docs/messages)

Workspace Example: 

```
const eba = require('eba')
const {toCSV} = require('./util.js')
const _ = require('lodash')

async function render(channel, h) {
    let name = h.getName('message')

    if (channel == 'workspace' && name == 'sc:Orders') {
        let token = h.getMeta('message')
        let data = await h.get('message')

        return [
            { text: token.text , title: _.trimStart(name, 'sc:')},
            { name: 'orders.csv', body: Buffer.from(toCSV(data)).toString('base64') }
        ]
    }
}

module.exports.main = async function (params) {
    let result = await render(params.input.channel, new eba.Params(params))
    if (result) {
        return { output: result }
    } else {
        return {}
    }
}
```

Workspace supports two types of render formats--Message, File, or a JSON array of both.

Message: 

    - text: the actual natural language text answering users question
    - title: title heading displayed over response
    - color: the color of nl text
    - actor: the entity responsible for sending the message

File:

    - name: the name of the file attachment
    - body: data content of the attachment (must be base64 encoded)
    - dims: dimensions of the image attachment (used for images only)
    
The example above demonstrates how to send an array of both types of formats.
