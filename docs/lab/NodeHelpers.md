### Node Helpers

A Node.js action within Watson Assistant can import the package "eba" which includes a variety of utility methods for working within the Assistant framework. The package can be required with `const eba = require("eba");`. 

The package exports the following classes and functions: `module.exports = {Params, Result, LazyLike, LazyValue, GenericLazyExecutor, NLToken, mapTree, reduceTree, makeAnnotation, insertAnnotation, hasAnnotation}`

#### Params

`Params` is used to interact with the parameters within your action. You can intialize an instance by passing in the input params of your main function, e.g. `const paramsHelper = new Params(params)` where `params` is the input variable to your main function.

The following functions are supported within `Params`:
* `makeLazyData(source)` -- creates a LazyData instance with the given source
* `getLazy(paramName)`   -- returns either a LazyValue or LazyLike instance for the given paramName
* `get(paramName)`       -- forces the execution of your lazy data and returns the value (simply returns real data in the case of LazyLike)
* `getName(paramName)`   -- returns the node name associated with paramName
* `getMeta(paramName)`   -- returns the meta data of the node associated with paramName
* `load(path)`           -- loads resource from remote storage
* `save(path, data)`     -- saves data as resource to remote storage

Note: since `get` forces the execution of lazy data, it is async and should be handled via Promises or async/await.

#### Result

`Result` is convenience class for providing an appropriate response to Watson Assistant. It contains properties for output and storage. Instances are typically created using an empty constructor.

The following functions are supported within `Result`:
* `set(paramName, data)`         -- merges a name, node pair to the output
* `setData(paramName, data)`     -- sets data to the concept denoted by paramName
* `setName(paramName, nodeName)` -- sets name of the node for paramName as nodeName
* `setType(paramName, type)`     -- sets type of the node for paramName as type
* `setMeta(paramName, meta)`     -- sets meta of the node for paramName as meta
* `addTags(paramName, ..tags)`   -- sets tags of the node for paramName as tags
* `store(key, value)`            -- stores the key, value pair to the result's storage

#### LazyValue and LazyLike

Watson Assistant supports lazy valued collections to reduce its data footprint when reasoning. A collection may be either lazy valued or real valued. If it is lazy valued, it is will be instantiated as a `LazyValue`. If it is real valued, it will be instantiated as a `LazyLike`. Both lazy and real valued collection support the same operations--hence the name `LazyLike`. This is particularly useful for developers, since certain actions may support both types of collections.

The following functions are supported within `LazyLike` and `LazyValue`.
* `lazyTake(n)`         -- takes top n from a collection
* `lazySort(k)`         -- sorts a collection by k
* `lazyValues(k)`       -- maps a collection by k
* `lazyFilter(k, p, v)` -- filters a collection for all k evaluated by p equaling v
* `lazyPortion(p)`      -- takes rounded percentile p from a collection
* `lazyReverse`         -- reverses a collection
* `lazyLength`          -- gets the length of a collection
* `lazyFirst`           -- gets the first element of a collection
* `lazyLast`            -- gets the last element of a collection. 
* `toJSON`              -- returns JSON representation of source
* `lazyForce`           -- forces the execution of lazy operations

Note: `lazyForce` forces the execution of your lazy data and is an asynchoronous operation. It should be handled using Promises or async/await. It is developers responsibility to correctly force the execution of this lazy data. The @force endpoint is the place to handle this.


#### Annotations

* `makeAnnotation(conceptName, confidence)`             -- creates an annotation with concept and confidence
* `insertAnnotation({token, annotations}, conceptName)` -- inserts an annotation into supplied annotations
* `mapTree(tree, f)`                                    -- applies `f` to each element in the tree
* `reduceTree(tree, f, acc)`                            -- reduces values to an accumulator after applying `f` recursively.