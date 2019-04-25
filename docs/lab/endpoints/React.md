## React Endpoint

EBA can react to more than just natural language input, it can also react to external events. For example, if EBA is embedded as an iframe within your web application, you can encode UI events and send them to EBA to be handled as actions. The react endpoint is run whenever an event is received. The input supplied to this endpoint contains a `repr` field containing all of the event data. Depending on the data or meta-data associated with `params.input.repr`, you can output the appropriate event concept to be inserted into EBA's reasoning pipeline. There should then be an action to handle the particular event concept. 

Below is an example that routes an incoming JavaScript click event to an `:OrderEvent` concept.

Example:

```
<button onclick="javascript:IBM_EBA.send({
            orderMeta: {
                orderID: 5678,
                orderName: 'Paper',
                customer: 1234
            }})">Send orders details</button>
```

```
module.exports.main = params => {
    const repr = params.input.repr
    if (repr.data.orderMeta)
        return {
            type: 'concept',
            name: ':OrderEvent',
            data: repr.data
        }
    else return {}
}
```
