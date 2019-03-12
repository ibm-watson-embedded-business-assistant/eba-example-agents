## Promises

As described in our [action component](./Actions.md), EBA supports a parameter type called `promise`, which enables data to be produced for an action only once some prelimenrary data is first acquired. This is typically accomplished by the use of follow up questions in a dialog series. For a live example of this feature, you may try out our [Weather agent](https://eba.ibm.com/assistant#/lab/agents/weather/actions). In this article, we will walk you through the steps of implementing a few promise dialogs, using our Weather agent as a reference. 

### Asking for follow-up information

Let's say that you have a business entity which requires, as a necessary condition in order to fetch the entity, another data element(s). In our case, this is `weather:Weather` which requires both a city as well as a timeframe.

Or, let's say that you are resolving a user's question and the runtime execution indicates an ambiguous case which needs to be resolved by a follow up? For example, if the user asks for a certain entity but you need to establish which type or which class it should be belong to. In these cases, a follow up dialog can be used to resolve any disambiguation.

Of course, in all these cases a user can ask a fully qualified question, in which case no follow up dialog is required, e.g. 'show me the weather in San Fransisco two days from now'. However, we do not anticipate or assume that this will always be the case, and, as a result, we enable developers to handle less qualified requests for data.

To handle less qualified requests, the following strategy can be employed. When a reference to your entity occurs, you can implement an action which returns a `promise` node as output, rather than a `data` node. For instance, `weather:Weather -> promise weather:Weather` signifies an unqualified case (the users asks something general as 'what is the weather?'). We cannot produce _data_ for `weather:Weather` until we first obtain a location. The code for such an action can look something like the following:

```
const {Result} = require('eba')

module.exports.main = (params) => {
  return new Result()
    .setName('weather:Weather', ':Question')
    .setData('weather:Weather', 'Which location should I get the weather for?')
}
```

From this code, we note two things. First, we rename our concept to `:Question` using the `setName` api detailed in our [node helpers](../lab/NodeHelpers.md). Secondly, as data, we supply the follow up question itself. With these two elements in place, our system will be able to understand that `weather:Weather` cannot be resolved in the current execution; instead, it should display a follow up question. 

Note that more complex cases can be modeled, e.g. our `weather:Forecast` requires both a timeframe as well as a location in order for data to be produced. We can either model this a 3-step sequence, viz. ask for forecast, ask for location, and, finally, ask for timeframe. Or we can model it as 2-step sequence, viz. ask for forecast and timeframe or location and then ask for the remaining element. Or we can be flexible enough to support both variants. This will depend largely on the agent's business requirements. In our implementation of `weather:Forecast`, we have followed the second route. Accordingly, you will find the following signatures in our implementation: 

 - `weather:Forecast(optional :Relation(data :Timeframe) -> promise weather:Forecast`
 - `weather:Forecast(optional :Relation(city)) -> promise weather:Forecast`
 
You will find that the body of such actions all follow the similar pattern described above, viz. rename to `:Question` with supplied NL question.

### Generating data


With a `promise` node in place, our system will attempt to resolve it, i.e. to convert it to a `data` node, whenever it is suitable. To enable such behavior, we should implement an additional action to produce real data. Of course, this action will contain as input all concepts required to resolve the entity at hand. In the case of weather, we have an action as `weather:Forecast`, we have an action `weather:Forecast (optional :Relation (data city), optional :Relation (data :Timeframe)) -> data weather:Forecast`. Note that this action requires both city and timeframe data and the output produces `data weather:Forecast`, meaning that it can provide the data which the user initially requested. The body of this action will use the supplied input to perform any api calls necessary. All actions for the weather agent as viewable to our users. Feel free to take a look and explore this feature in your own implementations.
