## React Endpoint

Watson Assistant can react to more than just natural language questions. It can react to external events. For example, if Watson Assistant is embedded as an iframe within your web application, you can encode ui events and send them to Watson to be handled as actions. The react endpoint is run whenever an event is recieved. The input supplied to this endpoint contains a `repr` field which contains all the event data. Depending on the data or meta-data associated with `params.input.repr`, you can output the appropriate event concept to be into Watson's reasoning pipeline. There should then be an action to handle the particular event concept. 

Below is an example that routes the incoming javascript click event to an `:OrderEvent` concept.

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
    } 
    else return {}
}
```