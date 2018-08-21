Welcome to Watson Assistant development! This article serves as a getting started guide for new Watson Assistant developers who are unfamilliar with our programming model. As a tutorial, we will develop our sample Walmart agent from sratch. This agent will be able to answer various questions about trending products. You may reference and try out [the complete working sample](../../samples/Walmart.md) any time you wish.

### Workflow
- [ontology](./Ontology.md)
- [patterns](./Patterns.md)
- [actions](./Actions.md)
- [rules](./Rules.md) 
- [visualizers](./Visualizers.md)

We propose the following development workflow for building any agent. Note that you will likely follow this workflow in an iterative process for each new piece of knowledge that you want to introduce to the assistant.
 
First, there should be an understanding of the domain you wish to model. You should ask yourself basic questions such as: What sorts of questions do I want the assistant to answer? What domain entities are used in such questions? Which attributes of these entities should I expose? How do these entities relate to one another? With this understanding in mind, you can being to program an [ontology of concepts](../components/Ontology.md). Watson undestands the world in terms of concepts. A concept is simply a domain object which your agent can recognize and understand given a sort of base definition. Likewise, an ontology is simply a set of relationships between concepts.

Secondly, we encourage the developer to implment [natural language patterns](../components/Patterns.md). These patterns serve as a bridge between natural language and the conceptual langauge which Watson is able to understand. In these patterns, you will match natural langauge tokens to their corresponding concepts. Natural language patterns are more than a mere keyword match; rather, they capture the syntatical context in which a token is used. For instance, consider the following the pattern:

`what is the {weather|:Weather} today?`

The term 'weather' signifies a noun subject in this case. However, the word 'weather' can contain a very different semantic meaning in other sentences, e.g. 'can we weather the storm?'. Based on the natural language pattern above, Watson will understand that this usage of 'weather' is different from the first usage and, subsequently, it will not introduce the concept `:Weather` into its reasoning pipeline when answering the second type of question.

Next we propose that [semantic actions](../components/Actions.md) and [rewriting rules](../components/Rules.md) should be developed. Reasoning in Watson Assistant is performed on a graph, where concepts represent nodes within this graph. The goal of actions is to produce real data for these concepts. For instance, if a user asks 'show me all products'. Watson will reason about the concept `wmt:Products` during reasoning time. During execution time, when it is ready to produce a response to this question, it should be able to produce real data via an executor function. This function may make a call to an external api or database to produce data. A rule, on the other hand, represents a kind of translation between concepts. Typically we will translate higher level concepts into lower level concepts.

Lastly, we encourage the development of visualizations for the data you are producing from your actions. All the data produced in your actions will be passed to your frotend visualizers so that you customize the visualization of your data. Visualizers are implemented as frontend [assets](../lab/Assets.md).
