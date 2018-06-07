This sample uses the Walmart API to build an agent interface for inpsecting their products.

The Walmart agent should prvoide insight into how to leverage well an existing api. You will note that this assitant supports only one action, viz. `getTrendingProducts`, yet the user may ask a wide variety of questions. This is partly because Watson Assistant provides concept attribute support out of the box, but, more importantly, Watson Assistant is able to reason and compose together multiple agents in a colloborative process. This enables users to ask questions such as "show me popular products with negative description". Watson is able to understand products concepts within the Walmart domain and sentiment analysis from another existing agent. You can view existing agents in the agent selector in the top actions bar. Additionally, this sample provides a substantial example of utilizing frontend assets to customize the visualization of your data to end users.

To get the most out of this sample, please load the [yaml configuration](./walmart.yaml) into your own sandbox enviornment. You will need to supply your own apiKey within settings. You can get your API key at https://developer.walmartlabs.com/.

### Development Notes

#### General

A description of potential actions you can ask the agent are provided in the description panel. As stated above, you will need to provide an apiKey to the settings table within General.

#### Concepts

The main domain object that this agent supports is `wmt:Products`. This concept supports a number of attributes, e.g. `wmt:SalesPriceValue` and `wmt:Description`. You can view all attributes in the attributes tab for the `wmt:Product` concept. Note that you must subclass these attributes appropriately. For instance, `wmt:Description` subclasses from `:Attribute` and `:StrAttribute`. All attributes must subclass from `:Attribute` and depending on the type of the attribute, it may additionaly subclass from `:StrAttribute`, `:NumAttribute`, and `:DateAttribute`.

#### Patterns

Patterns for this agent are straight forward. We label those concepts and attributes that we expect users to ask accordingly. Please view [patterns documentation](../Lab.md#patterns) if you are unfamilar with the notion of patterns within Watson Assistant.

#### Actions

This sample makes use of one action, viz. a call to get all trending products. You will notice that the action body contains the definition of the `main` function. This function takes as input any settings parameters that were set by the developer. Hence, it is through this parameter that developers can access their apiKey to call their existing apis.

#### Rewriting Rules

We supply one rewriting rule to the agent to inform it that whenever we ask for a `wmt:TrendingNow` concept, we are asking for the slightly lower level composition of concepts, viz. `wmt:Products(wmt:Trending)`, i.e. products trending now.

#### Assets

This sample provides frontend assets for jsx and css styling of our resulting products. Styling can greatly improve the visualization of your results the end user. The assets are integrated so that setting a class attribute in jsx corresponds to the same class within css.

