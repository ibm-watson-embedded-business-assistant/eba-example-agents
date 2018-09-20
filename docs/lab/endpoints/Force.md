## Force endpoint

The force endpoint is used to force the execution of lazy data. Lazy data is simply a mechanism for delaying the retrival of large data collections in order to reduce our application's data footprint and, in some cases, to even eliminate in-memory operations that modify these collections. As actions within Watson Assistant are highly composable, it is particulary useful to limit data passed from one action to another. Rather than supplying raw data to these interconnected actions, we instead can provide the system with a set of _instructions_ for producing the desired data as a kind of meta-data in place of real data. This enables us to layer multiple operations on top of each other before any data is actually produced, e.g. filtering, sorting, reversing, etc. In cases where the client api supports it, we can even push a data modifier operation, such as filtering, directly to the api-level. For more details on how to use lazy data within Watson Assistant, please consult our [node helpers interface](../NodeHelpers.md#lazy-evaluation) designed to handle this.

To illustrate the notion of lazy data as a meta data wrapper passed between your actions, consider a question where we want to fetch a large collection of data and perform some modifying operation on it as well, e.g. "show me all sessions in last week for chrome". Conceptually, we are simply fetching all sessions for a given timeframe as one action and then filtering those sessions where broswer is equal to Chrome in another action.

Action 1: `a subClassOf :Timeframe => :Sessions (optional :Relation (data a)) -> data :Sessions`:
```
const {Result, Params} = require('eba');

module.exports.main = async (params) => {
  const p = new Params(params);
  const timeframe = await p.get('a');
  const lazySessions = p.makeLazyData({method: 'getSessions', timeframe: timeframe});
  return new Result().setData(':Sessions', lazySessions);
};
```

In this first action we have created a lazy data wrapper passing in as arguments both a method name as well as a timeframe. We will see later that the method `getSessions` will be executed within our `@force` endpoint to produce _real_ data when we finally need it. We will supply the timeframe as a body of api request within this method, so we have also passed it as an argument. When this cloud functions finishes executing, it will return the following lazy data or meta data wrapper:

```
kind: genericLazyData
method: local
source:
    method: getSessions
    timeframe:
    end: '2018-09-17T07:00:00Z'
    start: '2018-09-10T07:00:00Z'
    value:
        grain: week
        type: value
        value: '2018-09-10T00:00:00.000-07:00'
        values:
        -
            grain: week
            type: value
            value: '2018-09-10T00:00:00.000-07:00'
```

This wrapper object provides directives to our system on how to treat this data. We tell the system that the `kind` of data is genericLazyData, meaning that it is lazy data which will be produced via a sub class extension of `GenericLazyExecutor` (see example below). It specifies `method`, which is a directive that we will load this data as an initial data source within our lazy data executor. As well as the `source`, which is source information provided when we created this lazy data wrapper. It will contain the parameters required to executed to supplied method, assuming you provided them within your action. These particular details are not important for you to remember as a developer. What is important to remember is that rather than producing real data, we are producing instructions to the system on how to produce this data when we later need it.

Action 2: `:Browser (optional :Relation (data :Sessions)) -> data :Sessions`
```
const {Result, Params} = require('eba');
const _ = require('lodash');

module.exports.main = async (params) => {
    // unwraps action input params for existing sessions and browser name
    const p = new Params(params);
    const sessions = p.getLazy(':Sessions');
    const browserName = _(p.get(':Browser')).map('form').join(' ');

    // returns filtered sessions data with nlg meta
    return new Result().setData(':Sessions', sessions.lazyFilter('browser', 'like', browserName));
};
```

In this action, we have accessed the lazy data wrapper described above just via `p.getLazy`. Afterwards we have provided an additional instruction to this wrapper, viz. a `lazyFilter` instruction. We often describe a lazy data wrapper as an onion for this reason. At the core of the onion we have instructions to produce a particular data set, e.g. sessions, but, on top of this core, we can layer multiple additional operations such as filtering, sorting, reversing, etc. The result of this action is defined in terms of the first action (see `source` field below). We simply applied a filter operation on top of this existing lazy data. The filter consists of the arguments we supplied above, viz. 'broswer', 'like', and browserName. This means that Watson will filter all sessions where the browser field is simillar (fuzzy match) to the browserName supplied in the original question, viz. 'chrome'.

```
args:
    - browser
    - like
    - chrome
kind: genericLazyData
method: filter
source:
    <lazy-data-object-from-the-fist-action>
```

Within the force endpoint, we typically extend a native class, `GenericLazyDataExecutor`, and, employing the template method design pattern, we override the `load` function within this class, which produces or loads our initial data set. Based on the input arguments within these function, we can dispatch to the appropriate sub class method to produce the real data required. Within the main function, we instantiate this subclass, and pass the functions input params to the `force` instance method and finally return the result. The force method will load the appropriate collection and any registered lazy operations will be applied on top of this by our system.

Below is an example that illustrates how to force lazy data for sessions within the endpoint.

Example:
```
const {Result, GenericLazyExecutor} = require('eba');
const {client} = require('./client.js');

class MyExecutor extends GenericLazyExecutor {

  constructor({storage, secrets}) {
    super({storage, secrets});
    this.storage = storage;
    this.secrets = secrets;
  }

  load(params) {
    const methods = { 'getSessions': this.getSessions };
    return (methods[params.method]) ? methods[params.method].call(this, params) : null;
  }

  getSessions({timeframe}) {
    return client.getSessions(timeframe);
  }

};

module.exports.main = (params) => {
  return new MyExecutor(params).force(params.input).then(data => new Result(data));
};
```

If your api supports such operations out of the box, e.g. filtering by certain types, you can see that based on the method name or based on the input parameters, you could easily make a call to such an api within this endpoint. This would me that the data processing operation is handled server side rather inside IBM Cloud FaaS. Actually, in the example above, this was done in the case of timeframes. The api supported a parameter for timeframes, so it produced the filtered results on their side. If this was not the case, that is, if the api just returned raw unqualified sessions, we could have applied an additional lazy operation to filter by dates, similar to filtering by browser. Pushing down to the api level is always recommended when it is available server side.