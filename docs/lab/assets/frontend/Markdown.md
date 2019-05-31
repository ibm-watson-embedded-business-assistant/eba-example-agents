## Mardown syntax

In EBA, your agent's messages can be formatted using markdown syntax. In order to enable this syntax, the only requirement is that that message node being visualized contains the tag "markdown". To illustrate, consider the example below, where we model an action to upload a file. We see that this action produces data for `:UploadFile`, which subclasses from `:Messsage`, enabling the textual data returned from this action to serve as our top level response to the user. In the code below, the tag "markdown" is added to our data via the `addTags` function from our [node helpers module](../../NodeHelpers.md). This enables the message data to be formatted using markdown syntax.

```
const {Result} = require('eba')

module.exports.main = async (params) => {
  return new Result()
    .setData(':UploadFile', 'I am handling your _upload_ **event**')
    .addTags(':UploadFile', "markdown")
}
```
