### Actions tab

This tab is responsbilie for managing your action signature defintions as well as the IBM cloud functions executors.

#### Naming

Naming for actions follow a similar format as naming for concepts, viz. `domain:action`. The same domain should be used for both concepts and actions. Action should be descriptive of what the action does. For instance, `sc:GetSalesOrdersById` denotes the action GetSalesOrderById for the sc (Supply Chain) domain.

#### Signature

Watson Assistant is able to reason about actions provided by their signature. The signature can be thought of as a map of inputs to outputs while providing some optional constraints on these parameters. The format used for action signatures are the following, viz. `constraints => input -> output`. Watson Assistant is powered by Haskell, and this paradigm for defining actions will be familar to Haskell developers.

#### Constraints

Click the constraints tab to enter a constraint. A constraint is also represented in the RDF format already mentioned, viz. subject predicate object. They serve as a way to provide generalism to our actions. Consider the following constraints: `a subClassOf :Lists` This constraint binds the parameter `a` to be any subclass of :Lists. This means that our action will be able to work generically with any type of list, e.g.  :ContactLists, :Orders, :Supplies. Note that the developer must provide appropriate entries in the ontology in order for the action to work properly, e.g. `:ContactList subClassOf :List`. The constraint parameter `a` can now be referenced in the input and output specifications.

#### Input

Click the input tab to enter an input definition. 

#### Modules

Actions within Watson Assistant can make use of a variety of pre-installed modules: [node modules](./NodeModules.md)

#### Helpers

Watson Assistant also provides developers with a utility pacakge for working with its own components: [node helpers](./NodeHelpers.md)


[Learn more about actions](../components/Actions.md)
