## Force endpoint

The force endpoint is used to force the execution of lazy data. Lazy data is simply a mechanism for delaying the retrival of large data collections in order to reduce our application's data footprint and, in some cases, to even eliminate in-memory operations that modify these collections. As actions within Watson Assistant are highly composable, it is particulary useful to limit data passed from one action to another. Rather than supplying raw data, we can provide **instructions** for producing the desired data as a kind of meta-data. This enables us to layer multiple operations on top of each other before any data is actually produced, e.g. filtering, sorting, reversing, etc. In cases where the client api supports it, we can even push a data modifier operation, such as filtering, directly to the api-level. For more details on how to use lazy data within Watson Assistant, please consult our [node helpers interface](../NodeHelpers.md#lazy-evaluation) designed to handle this.

Within the force endpoint, we typically extend a native class, `GenericLazyDataExecutor`, and, employing the template method design pattern, we override the `load` function within this class, which produces or loads our initial data set. Based on the input arguments within these function, we can dispatch to the appropriate sub class method to produce the real data required. Within the main function, we instantiate this subclass, and pass the functions input params to the `force` instance method and finally return the result. The force method will load the appropriate collection and any registered lazy operations will be applied on top of this by our system.

Below is an example that illustrates how to force lazy data for sales and supply orders.

Example:
```
const util = require("./util.js")
const eba = require("eba")
const _ = require("lodash")

class Executor extends eba.GenericLazyExecutor {
    constructor(settings) {
        super()
        this.settings = settings
    }

    load(params) {
        console.log("forceData", params)

        if (params.method == "getSupplyOrders") {
        return util.api(this.settings, "supplyorders").then(response => response.results)
        }

        if (params.method == "getSalesOrders") {
        return util.api(this.settings, "salesorders").then(response => {
            let items = response.results

            if (params.timeframe && params.attribute) {
            let attrName = params.attribute
            let start = new Date(params.timeframe.start)
            let end = new Date(params.timeframe.end)
            return _.filter(items, order => {
                let value = order[attrName]
                if (!value) return false
                let date = new Date(value)
                return date >= start && date <= end
            })
            } else {
            return items
            }
        })
        }
        
        console.log("forceData: unknown method", params)
        return null
    }
}

function main({settings, input}) {
    return new Executor(settings)
        .force(input)
        .then(data => new eba.Result(data))
}

module.exports = {main}
```