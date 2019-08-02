**Note: You will need access to the [IBM Supply Chain Insights api](https://developer.ibm.com/api/view/scinsights-prod:supply-chain-insights:title-Supply_Chain_Insights) in order to use this agent. Otherwise this agent should be treated as read-only.**

This sample models a supply chain domain. In particular, it allows us to inspect sales orders and supply orders.

The supply chain agent is perhaps the most concrete sample that we provide insofar as it utilizes our lazy data interface and provides insight into many areas of EBA Development, viz. endpoints, backend and frontend assets, multiple attribute types, and complex action signatures.

To get the most out of this sample, please load the [yaml configuration](./supplychain.yaml) into your own sandbox enviornment. 

## Dev notes

### General

In order to run this agent, you will need to enter the appropriate credentials in their designated fields in settings. Additionally, you notice that this agent uses an endpoint called `@force`. This endpoint forces lazy data to be evaluated. Lazy data evaluation provides a method for pushing data modifiers on top of large collections to the api level. To clarify, if we are operating on a large data collection that needs to be filtered, sorted, etc. then, rather than passing this large collection to each intermediate operation, we simply create a lazy data wrapper. This wrapper is analogous to an onion. At the bottom we have our api call to produce real data, but on top of these we have several layers of lazy operations, e.g. filter data, sort data, and take first 5 of data. The `@force` endpoint is where we unwrap this onion the produce only the necessary subset of data--culminating in a smaller footprint. The intermediate lazy operations will be registered within our actions and supplied to this endpoint as a set of parameters.

### Concepts

This agent follows a similar paradigm as our other samples. We have our main domain objects, viz. `sc:SalesOrders` and `sc:SupplyOrders`, following by a set a relevant attributes for each. Note that we support a few `:DateAttributes` in this sample, e.g. `sc:RequestedShipDate`. We do highlight one particular ontology entry: `sc:FilterScheduledOrders subClassOf action:Filter`. This is an example where we an action subclasses from a concept. In this case, we specify that our action is a type of filtering actions. The Assistant will internally assign it a given priority wihtin a chain of lazy operations. Our system supports three kinds of action types, viz. `action:Filter`, `action:Sort`, and `action:Select`. These are listed in ascending order of priority.

### Patterns

Patterns for this agent are straightforward. Please see our [documentation on patterns](../docs/components/Patterns.md) if you are unfamiliar with this component of the assistant.

### Actions

To help clarify, we break down the supply chain actions into two main categories: actions which make lazy data parameters and actions which operate on lazy data parameters. You will find that `sc:GetSalesOrdersByDates`, `sc:GetAllSalesOrders`, and `sc:GetAllSupplyOrders` are actions which make lazy data parameters. They use the Params api provided by the eba package to accomplish this. This should register with our general intuition behind lazy data. Each of these actions may produce very large collections. Hence we make them lazy. We have the `sc:FilterScheduledOrders` actions which operates on these lazy data parameters. It simply fetches the lazy parameters from the previous actions and uses the Params api to append a lazy filtering operation on top. When the assistant needs real data, it will use `@force` to create this data in one shot. Note that there is also an action named `sc:GetSalesOrderById`. This action returns a single element, hence no lazy data interface is required.

### Assets

Frontend assets are implemented in order to help visualize our results, and a backend util.js module is implemented to encourage code reuse. If multiple actions make you the same routine, consider creating a backend asset containing this routine and importing it where required.
