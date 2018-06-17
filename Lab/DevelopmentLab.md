The developement lab was created in an effort to enable an open system of Watson Assistant skill developers. Using the lab tools, developers can write skills to extend Watson Assistant to their organizational and personal needs. This document contains an overview of the various features and components of the lab.


### Lab Actions Bar

#### Agent Selector

You can use the agent selector to view and edit other agents. You will have read access to all agents, but write access only to your own agents. You are invited to view these public agents as a reference in the course of your development.

#### Undo and Redo

Our lab will maintain a history of your most recent changes within a given session. You may redo and undo changes accordingly.

#### Saving and Discarding

In order for your changes to be published to EBA core, you must click the Save changes button. This will update your configuration, and the lab will remember this configuration the next time that you log in. If in the course of development, you want to back out your current change set, pressing the Discard changes button will revert your work back to the most recent published version. 

Once you have saved your changes, you may immediately begin to test your work by asking the assistant questions in the left conversation panel. 

#### Import and Export

The skills you develop within the lab are represented in an SCM friendly, yaml configuration. You can import and export this configuration using the "Import" and "Export" buttons on the lab actions bar.


### General Tab

#### Description

The description is a useful place to describe your skill as well as the sorts of questions that it supports. It is designed to serve as an intial refernce when sharing and collborating with others.

By clicking the edit button, you will be able to enter custom markdown in a code editor. Once you apply these changes, you will immediately see the changes reflected.

#### Settings

Settings is useful place to skill level parameters. It may be used to store credential information, such as api keys. These parameters will be accessible to agents later in the action development pipeline via function input parameters.

#### Endpoints

Watson Assistant supports certain special endpoints that can be activated during the reasoning pipeline. Currently we support `@start`, `@tag`, and `@force` endpoints. `@start` is used to initial any storage configuration any session intialization parameters that your agent supports. `@tag` is used to support custom annotation. This is a useful place to support named entity recognition for your skill's domain. `@force` is used in the context of lazy data evaluation. When a series of lazy data operations is finally required by the assistant, it will call this endpoint to fetch the real data beneath the lazy operations.

### Concepts Tab

This tab is responsible for managing your skill's concepts.

#### Naming

A concept will require a `:` deliminated name of the following form (domain):(concept), where the domain is optional, but encouraged. For example, `marketing:Mailings` and `:Size` is are valid concept names. Ill formed names will be rejected. Note that the domain can be scoped to your organization, e.g. `wca:Mailings` for Watson Campaign Automation (wca). 

#### Spelling, SubClasses, and ListOfs

The most common ontology predicates have been factored out into their own tabs within the concepts table. It is important to understand each. Spelling is useful for natural language generation (NLG). Watson Assistant does not produce hardcoded, canned responses to user questions. It relies on NLG to reply intelligently to users. Providing a spelling of your concept enables the system to reply to you in an intellegent and expected manner. SubClasses are used to model a hierarchial relationship between concepts. For instance, anything which is a subclass of `:Showable` concept is able to be shown to the user. isListOf is a predicate used to distinguish collections from the singular counterparts.

[Learn more about ontology](Components.md#ontology)

#### Attributes

In order to attach an attribute to a concept, click on the attributes tab link, which will open a new table popup. An attribute must designate both the name of the attribute concept as well as the property field name that the assistant will search for when performing an data operations involving this attribute. For example, a `:SalesOrder` concept may contain an `:CustomerID` attribute, which we expect as the following key in a json payload: "customer_id".


#### Ontology

The ontology tab link is provided to developers in order to inspect existing ontology as well as to add additional ontology predicates outside of spelling, subClassOf, and isListOf. You can expand your ontology in this tab by entering an rdf triple: subject, predicate, and ontology. Note that the spelling predicate is not enabled to be viewable in this tab. Deleting an ontology entry in this tab may have side effects in other existing components. For example, if we remove the triple `:CustomerID subClassOf :Attribtue` entry. You will see this change reflected in the concepts table itself, but, more importantly, any actions relying on this previous relationship may be broken. Our lab ensures that your changes will be propagated and reflected accordingly through the skill, but it is the responsbility of the developer to ensure that their components are consistent.

[Learn more about attributes](Components.md#attributes)

#### Notes

Notes are simply plain text descriptions regarding a particular concept. Feel free to use notes in any way to suits your needs. They may be particularly useful in denoted experimental concepts or disambiguation in the case of collaborative development.

### Patterns Tab

This tab is responsible for managing natural lanugage patterns.

#### Patterns

A pattern effectively contains an annotated question that you would like your assistant to answer. Annotations are delineated following the format `{token|concept}`. For example, "show me {status|:Status} of these {sales orders|:Orders}" is one pattern entry. This pattern conveys a number of things to your assistant. First, it tells the assistant that the tokens "status" and "sales order" may be considered to refer to :Status and :Orders concepts respectively, which is useful in the course of natural language understanding. Additionally, it provides a sequence of tokens which influence the reasoning engine's scoring metrics. Beacause we have supplied a direct annotation {sales order|:Order}, the system will favor this intreprataion to other competing intrepretations, e.g. {sales|:Sales} {order|:Order}. 

Concepts are color coded within the lab to help assistant readablity.

[Learn more about patterns](Components.md#patterns)


### Actions Tab

This tab is responsbilie for managing your action signature defintions as well as the IBM cloud functions executors.

#### Naming

Naming for actions follow a similar format as naming for concepts, viz. `domain:action`. The same domain should be used for both concepts and actions. Action should be descriptive of what the action does. For instance, `sc:GetSalesOrdersById` denotes the action GetSalesOrderById for the sc (Supply Chain) domain.

#### Signature

Watson Assistant is able to reason about actions provided their signature. The signature can be taught be thought of as a map of mapping inputs to outputs while providing some optional constraints on these parameters. The format used for action signatures are the following, viz. `constraints => input -> output`. Watson Assistant is powered by Haskell, and this paradigm for defining actions will be familar to Haskell developers.

#### Constraints

Click the constraints tab to enter a constraint. A constraint is also represented in the rdf format already mentioned, viz. subject predicate object. They serve as a way to provide generalism to our actions. Consider the following constraints: `a subClassOf :Lists` This constraint binds the parameter `a` to be any subclass of :Lists. This means that our action will be able to work generically with any type of list, e.g.  :ContactLists, :Orders, :Supplies. Note that the developer must provide appropriate entries in the ontology in order for the action to work properly, e.g. `:ContactList subClassOf :List`. The constraint parameter `a` can now be referenced in the input and output specifications.

#### Input

Click the input tab to enter an input definition. 



