This sample models a supply chain domain. In particular it allows us to inspect sales orders and supply orders.

The supply chain agent is perhaps the most concrete sample that we provide insofar as it utilizes our lazy data interface and provides insight into many areas of Watson Assistant Development, viz. endpoints, backend and frontend assets, multiple attribute types, and complex action signatures.

To get the most out of this sample, please load the [yaml configuration](./supplychain.yaml) into your own sandbox enviornment. You will need access to the supply chain insights api in order to use this agent. 

### Dev Notes

#### General

In order to run this agent, you will need to enter the appropriate credentials in their designated fields in settings. Additionally, you notice that this agent uses an endpoint called `@force`. This endpoint forces lazy data to be evaluated. Lazy data evaluation provides a method for pushing data modifiers on top of large collections to the api level. To clarify, if we are operating on a large data collection that needs to be filtered, sorted, etc. then, rather than passing this large collection to each intermediate operation, we simply create a lazy data wrapper. This wrapper is analogous to an onion. At the bottom we have our api call to produce real data, but on top of these we have several layers of lazy operations, e.g. filter data, sort data, and take first 5 of data. The @force endpoint is where we unwrap this onion the produce only the necessary subset of data--culminating in a smaller footprint.

####

####

####

####
