## Render Endpoint

Watson Assistant can provide native rendering for a few popular communication channels. Currently, we support Slack and Watson Workspace. The rendering format is, of course, dependant upon the api exposed by such channels. Be advised that Watson Assistant already has a default mechanism for rendering messages in such channels. By default, Watson will take a clickable snapshot of the original message that would otherwise be rendered within our web application and post it as an image link to the channel. Within the channel, this message can be clicked to engage into a full view of the message data. You should consider using the render endpoint if you desire to override this default behavior by using the native formatting provided by a particular channel. Within the endpoint, you will have the following information supplied as input:
- channel -- the name of the channel, so you can render appropriately for each
- node -- contains the nl text and concept name that data was produced for
- data -- raw data collection to be rendered

Slack Example:

```
function render(channel, node, data) {
    let { text, name } = node.data.content

    if (channel == "slack") {
        if (name == "wmt:Products") {
            let attachments = data.map(renderProduct)
            return {
                text: text,
                attachments: attachments
            }
        }
    
        if (name == "wmt:Product") {
            return {
                text: text,
                attachments: [renderProduct(data)]
            }
        }
    }
}

module.exports.main = function({ input }) {
    let result = render(input.channel, input.node, input.data)
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
const {toCSV} = require('./util.js');
const _ = require('lodash');

const render = (channel, node, data) => {
  let { text, name } = node.data.content

  if (channel == "workspace") {
    if (name == "sc:Orders") {
      return [
        { text: text , title: _.trimStart(name, 'sc:')},
        { name: 'orders.csv', body: Buffer.from(toCSV(data)).toString('base64') }
      ]
    }
  }
}

module.exports.main = ({ input }) => {
  let result = render(input.channel, input.node, input.data)
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
