## Node helpers

A nodejs action within EBA can import the package "eba" which includes a variety of utility methods for working within the Assistant framework.

### Table of contents

- [Input](#input)
- [Output](#output)
- [Lazy Evaluation](#lazy-evaluation)
- [Ontology](#ontology)
- [Short Term Memory](#short-term-memory)
- [Long Term Memory](#long-term-memory)
- [Natural Language Generation](#natural-language-generation)
- [Natural Language Understanding](#natural-language-understanding)
- [Use in external actions](#use-in-external-actions)

### Input

`Params` is used to interact with the parameters within your action. You can initialize an instance by passing in the input params of your main function:

```
const eba = require('eba')

module.exports.main = function(params) {
    let p = new eba.Params(params)
}
```

You can use method `get(paramName)` of `Params` object to get a value associated with a particular parameter. This method will automatically force the lazy values (see [Lazy Evaluation](#lazy-evaluation)) 

Note: since `get()` forces the execution of lazy data, it is asynchronous and should be handled using either Promises or async/await. We recommend to use async/await:

```
const eba = require('eba')

module.exports.main = async function(params) {
    let p = new eba.Params(params)
    let value = await p.get("example:ParamName")
}
```

You can also get a concept name given a parameter name using `getName(paramName)` method. It can be useful if you semantic action takes polymorphic input parameters and you need to know the exact concept name at the execution time.

### Output

`Result` is a convenience class for providing an appropriate response to EBA. It contains methods to set data for the output nodes of your semantic action. Instances are typically created using an empty constructor.

```
const eba = require('eba')

module.exports.main = function(params) {
    return new eba.Result()
        .setData('example:ParamName', { foo: 'bar' })
}
```

Note: `setData()` method can also accept lazy values (see [Lazy Evaluation](#lazy-evaluation))

Using the `Result` object you can also change name, type and tags of the output nodes:

* `setName(paramName, nodeName)` -- sets name of the node for paramName as nodeName
* `setType(paramName, type)`     -- sets type of the node for paramName as type
* `addTags(paramName, ..tags)`   -- sets tags of the node for paramName as tags

### Lazy Evaluation

EBA supports lazy evaluations to reduce data footprint when executing semantic actions. Lazy evaluations are especially important in OpenWhisk actions as OpenWhisk has limitations for input/output data. The input and output data of a semantic action may contain lazy values. `Params` helper is designed to recognize and handle lazy values properly. If you use `get()` method it will force the lazy data for you. However if you need to keep the data lazy (for example to perform another lazy operations on top of the data) you should use `getLazy()` method instead. Lazy value has the following methods:

* `lazyTake(n)`         -- takes top n from a collection
* `lazySort(k)`         -- sorts a collection by k
* `lazyValues(k)`       -- maps a collection by k
* `lazyFilter(k, p, v)` -- filters a collection for all k evaluated by p equaling v
* `lazyFilters(xs)` -- filters a list of filters using disjunctive OR logic
* `lazyPortion(p)`      -- takes rounded percentile p from a collection
* `lazyReverse()`       -- reverses a collection
* `lazyLength()`        -- gets the length of a collection
* `lazyFirst()`         -- gets the first element of a collection
* `lazyLast()`          -- gets the last element of a collection
* `lazyForce()`         -- forces the execution of lazy operations

Note that in the case of lazyFilter we support the following predicates. 

```
if (p == "<")  return (x, y) => x <  y
if (p == "<=") return (x, y) => x <= y
if (p == "=")  return (x, y) => x == y
if (p == "<>") return (x, y) => x != y
if (p == ">=") return (x, y) => x >= y
if (p == ">")  return (x, y) => x >  y
if (p == "startsWith") return startsWith
if (p == "endsWith") return endsWith
if (p == "contains") return contains
if (p == "like") return fuzzyCheck
if (p == "between") return between
```

These predicates are straightforward, but we will note that the "like" predicate performs a fuzzy check based on levenshtein distance and the "between" predicate is used to check date values between a specified start and end period, e.g. `lazyFilter('closingDate', 'between', {from: date.start, to: date.end})`.

Every method except `lazyForce()` returns new lazy value so the lazy operators can be chained:

```
const eba = require("eba")

module.exports.main = async function(params) {
    let p = new eba.Params(params)
    let lazyValue = p.getLazy("example:ParamName")
    let newLazyValue = lazyValue.lazySort("name").lazyTake(5)
}
```

Note: `lazyForce()` is an asynchronous method. It should be handled using Promises or async/await. It is developers responsibility to correctly force the execution of this lazy data.

In semantic action you can create your own lazy value using `makeLazyData()` method of `Params` object. This method takes the JSON object with the instructions to force the data once it will be requested. The `@force` endpoint is the place to handle this.

```
const eba = require("eba")

module.exports.main = async function(params) {
    let p = new eba.Params(params)
    let lazyValue = p. makeLazyData({ foo: "bar" })
    return new eba.Result().setData("example:ParamName", lazyValue)
}
```

### Ontology

To query the ontology you can use `query()` method of `Params` object. This method takes query string. The syntax of ontology query as the same as the one in semantic action constraints:

```
const eba = require("eba")

module.exports.main = async function(params) {
    let p = new eba.Params(params)
    let result = await p.query("a isListOf b, b subClassOf :Showable")
}
```

The method returns a list of possible matches where each item is a map of the polymorphic symbols to the concept names.

Note: `query()` method is asynchronous and should be handled using either Promises or async/await.

### Short Term Memory

Short-term memory is aimed to store and reuse data within a session. To save the data into short-term memory the `store()` method of `Result` object. This method takes string key and JSON value:

```
const eba = require("eba")

module.exports.main = function(params) {
    return new eba.Result().store("foo", { bar: "baz" })
}
```

The saved data can be accessed from subsequent actions via params:

```
module.exports.main = function(params) {
    let myData = params.storage.foo
}
```

### Long Term Memory

Long-term memory allows you data to survive between sessions. To load and save the data the corresponding methods of `Params` object may be used:

* `load(path)` - loads data from long-term memory
* `save(path, data)` - saves data to long-term memory

Note that both methods are asynchronous.

### Natural Language Generation

EBA can generate natural language automatically based on signature of the semantic actions. However the semantic actions interface allows developers to provide their own natural language representation. The Natural Language Generator takes natural language token associated with a data node (represented as `NLToken` object) and produces the natural text. In semantic action you can return `NLToken` for the output node using `setMeta()` method of `Result` object. `NLToken` objects can be combined so you can take the `NLToken` from the input nodes and combine them:

```
const eba = require('eba')

module.exports.main = function(params) {
    let p = new eba.Params(params)
    let inputToken = p.getMeta("example:ParamName")
    let outputToken = new eba.NLtoken("example:OutputName").addProperty(":Relation", inputToken)
    return new eba.Result().setMeta("example:OutputName", outputToken)
}
```

### Natural Language Understanding

* `makeAnnotation(conceptName, confidence)`             -- creates an annotation with concept and confidence
* `insertAnnotation({token, annotations}, conceptName)` -- inserts an annotation into supplied annotations
* `mapTree(tree, f)`                                    -- applies `f` to each element in the tree
* `reduceTree(tree, f, acc)`                            -- reduces values to an accumulator after applying `f` recursively.

### Use in external actions

To use EBA helpers in external actions add eba-agent module as a dependency:

```
npm install git+https://github.com/ibm-watson-embedded-business-assistant/eba-node-agent.git
...
const eba = require('eba-node-agent')
```

