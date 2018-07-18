### Actions

Actions are the means by which the assistant can provide real data to corresponding concepts. Each skill will contain a set of actions, where each action is designated by a set of [constraints](#constraints), [input](#input), and [output](#output). An action's signature follows the format `constraints => input -> output`. Given an configuration of input concepts subject to certain constraints, the system will be able to produce the specified output after executing the body of the action. In addition to this signature, an action will have a name as well as a function to be invoked when the action is selected. For example consider the action below:

```
:Products(:Trending) -> data :Products
```

Note that this action does not have any constraints - constraints are optional. This action effectively states that if the assistant recognizes a `:Products` concept as well as a `:Trending` concept, then the system can produce real data for the `:Products` concepts. The data will be produced by the body of this action, which can query a database, call an api, etc.

Actions can also take data provided by other actions:

```
:Products(data :Category) -> data :Products
```

This action will expect a data node `:Category` which has to be created by another action. The action can be triggered once the user asks for products by category, for example:

Q: _show me products for category "Jeans"_

Inside the body you can access this data using params helpers:

```
const eba = require("eba")
module.exports.main = async function(params) {
	let p = new eba.Params(params)
	let category = await p.get(":Category")
	let products = ... get products by category here
	return new eba.Result().setData(":Products", products)
}
```

To get a category by it's name the following action can be used:

```
:Category(data :UserString) -> data :Category
```

Processing of quoted strings is available out of the box. Each quoted string will be annotated with `:UserString` concept and the corresponding data will be created. So you can just get this data in your action body:

```
let categoryName = await p.get(":UserString")
```

To clarify the sense of some input parameters we can add auxiliary concepts to the signature:

```
:Category(:WithName(data :UserString)) -> data :Category
```

In this case the action will be triggered __ONLY__ when `:UserString` node has an auxiliary neighbour concept `:WithName` as in questions like:

Q: _show me products for category named "Jeans"_

or

Q: _show me products for category with name "Jeans"_

The auxiliary concept can be marked as optional:
```
:Category(optional :WithName(data :UserString)) -> data :Category
```

This action can be triggered in both questions with or without the concept `:WithName`.

The data parameters can be optional too:

```
:Products(optional data :Category) -> data :Products
```

In this case we can return products related to a certain category if we have category data or all the products otherwise.

The input parameters can be implicit:

```
:Products(implicit data :Category) -> data :Products
```

This action can be triggered without the `:Category` concept in the question thread (an optional parameter) but the agent will still be able to search for the `:Category` concept data in the context. For example the following scenario will work with implicit `:Category` parameter:

Q: _show me category "Jeans"_

A: Agent will get the category "Jeans"

Q: _show me products_

A: Agent will get products for category "Jeans"

If no concept found in the context the agent will try to recover this concept data using available actions so we will be able to ask questions like _show me products for "Jeans"_.

#### Constraints

Constraints are simply a way to qualify your concepts using rdf triples. As in the case of ontology, constraints follow the format of *subject*, *predicate*, *object*, where the subject and object must be either a concept or another symbol and predicate can be anything as long as it is used consistently within your configuration. Constraints are used within Watson Assistant to denote a polymorphic parameter. For instance, `a subClassOf :List` constrains the symbol `a` to be *any* list. Constraints only hold scope local to the signature they are defined in. Within our Lab, a warning will be issued if a constraint is defined but never actually used within the remainder of the signature. Likewise, a warning will be issued a constraint symbol is used within the signature but never decalred. Hence, `a subClassOf :RankingMetric => :Mailings -> data :Mailings` contains a superfluous constraint, while `:Mailings(a) -> :Mailings` contains an undeclared symbol `a`. A valid signature would be the following `a subClassOf :RankingMetric => :Mailings(a) -> data :Mailings`.

In certain cases, it is possible to refer to a constraint paramter multiple times within a single signature, so it is necessary to distinguish between these references. For instance, `a subClassOf :Showable => a(reference:Direct, context data a @src)` makes uses of the constraint parameter `a` twice. To distinguish the second occurence of the parameter, we add an alias: `@src`. Now, within the body of our action, we can require data by indexing our deps as "src".

#### ParamType and QueryType

Concepts within a signature can be qualified with additional specifications to apply different semantics to your action. These specifications are applied through the use of `paramTypes` and `queryTypes`. `paramTypes` qualify the parameters within a given signature, while `queryTypes` qualify the actual query. 

We support two `paramTypes`, viz. `concept`, and `data`. `concept` is the default `paramType` and no keyword is required to denote it. It simply signifies that a signature requires a given concept to be present in the parse tree. `data` denotes the real data associated with an action (which is produced by another action). For instance, `edi:Submit(data edi:Invoice)` denotes a submission request that requires real invoice data. 

We support four `queryTypes`, viz. `regular`, `optional`, `context`, and `implicit`. `regular` is the default `queryType` and no keyword is required to denote it. It simply signifies that a query matches a concepts in the current question as expected. `optional` qualifies the query to accept an optional parameter, e.g. `:Mailings(optional :All)` means that our action can support questions such as "show me all mailings" or simply "show me mailings". `context` means that our query can search the conversational context for a parameter. For instance, `edi:Modify (context data edi:Invoice)` is an action which modifies an already invoice. `implicit` is like `context` but different insofar as it gives the assistant license to create new concepts through the use of other actions before executing the current action. For instance, if we have one action as `:SendVolume(optional :Relation(implicit data :Mailings))` and another action as `:Mailings -> data :Mailings`, then, when answering a question about send volume, the assistant may execute the mailings action first in order to have data to complete the action for send volume. Mailings nodes will be tagged within the information space as `virtual`. Because `implicit` actions may create additional concepts as a side effect and thus signficantly alter the complexity of answering a question, they should be used judiciously. In fact, you should try to avoid `implicit` parameters whenever possible. Both `context` and `implicit` should only be used to qualify `data` nodes.

#### Input

An action's input is represented as a tree of concepts. These concepts must be matched against in order for the action to be selected for execution. The concepts in this tree may be qualified with `paramTypes` and `queryTypes`. A common usage of `paramTypes` within input is to specify that an action requires real data. For instance, `sc:Order(sc:Identifier)` will fire when the system notices a request such as "show me order #1234", however, it will not supply the real data associated with the identifier, viz. 1234, to your action since it is only requiring the `concept` `sc:Identifier` to be present. To make use of this real data, i.e. to signify that `sc:Idenifier` is a parameter with `data`, input should be denoted as `sc:Order(data sc:Identifier)`. A common usage of `queryTypes` within an input is to denote that a parameter may be taken from already existing context. For instance, `:Confirmation(context data expo:DeleteProduct)` requires real data associated with a deleted product to already exist within the context of the conversation--which makes sense given that this action is a confirmation request. As you can see from this example, both `paramTypes` and `queryTypes` can be used in conjunction with one another when defining an input signature.

Since input is represented as a tree, an ordering is imposed on the concepts. For instance, `:News(:Relation(:Organization)) -> data :News` implies the following ordering "news" -> "related to" -> "organization". Watson Assistant is able to understand such inherent dependencies when it builds the syntax tree for your question, enabling it to distinguish between a similar question such as "organization" -> "related to" -> "news".

#### Output

Whereas input was a tree, output is simply a flat list of concepts. These concepts can only be qualified with `paramTypes`. Most often the output of an action is strictly a single concept qualified as data, e.g. `-> data Mailings`.