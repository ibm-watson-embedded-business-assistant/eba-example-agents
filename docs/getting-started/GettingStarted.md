## Getting started

Welcome to EBA development! This article serves as a getting started guide for developers who are unfamiliar with our unique machine reasoning programming model. First, we provide a brief overview of EBA's collaborative reasoning pipeline. This will help you get a solid grasp of the fundamentals before you dive into building your first agent. Next, we provide a tutorial which guides the development of a sample Walmart agent from scratch. This agent will be able to answer various questions about trending products. You may reference and try out [the complete working sample](../../samples/Walmart.md) any time you wish.

### Reasoning pipeline
The steps below essentially describe how EBA works, and demonstrates the journey of a user's question through EBA's collaborative reasoning pipeline.

Encoded conceptual knowledge: Developers encode a set of concepts and relationships to tell our assistant what it can understand and reason about. Without conceptual entities, there is effectively nothing to reason about.

SyntaxTree creation: A user’s natural language question is broken down into its morphological and syntactical features and represented as a tree.

Annotation: Natural language within a user’s syntax tree is annotated or mapped to conceptual entities.

Reasoning: Given a starting point of conceptual entities, EBA considers all possible outcome paths and reasons to produce the most relevant one.

Execution: Having settled on the appropriate action path, EBA executes that path including any side effects it may produce.


### Development workflow
- [ontology](./Ontology.md)
- [patterns](./Patterns.md)
- [actions](./Actions.md)
- [rules](./Rules.md) 
- [visualizers](./Visualizers.md)

We propose the following development workflow for building any agent. Note that you will likely follow this workflow in an iterative process for each new piece of knowledge that you want to introduce to the assistant.
 
First, there should be an understanding of the domain you wish to model. You should ask yourself basic questions such as: What sorts of questions do I want the assistant to answer? What domain entities are used in such questions? Which attributes of these entities should I expose? How do these entities relate to one another? With this understanding in mind, you can begin to program an [ontology of concepts](../components/Ontology.md). Watson understands the world in terms of concepts. A concept is simply a domain object which your agent can recognize and understand given a sort of base definition. Likewise, an ontology is simply a set of relationships between concepts.

Secondly, we encourage the developer to implement [natural language patterns](../components/Patterns.md). These patterns serve as a bridge between natural language and the conceptual language which Watson is able to understand. In these patterns, you will match natural language tokens to their corresponding concepts. Natural language patterns are more than a mere keyword match; rather, they capture the syntactical context in which a token is used. For instance, consider the following the pattern:

`what is the {weather|:Weather} today?`

The term 'weather' signifies a noun subject in this case. However, the word 'weather' can contain a very different semantic meaning in other sentences, e.g. 'can we weather the storm?'. Based on the natural language pattern above, Watson will understand that this usage of 'weather' is different from the first usage and, subsequently, it will not introduce the concept `:Weather` into its reasoning pipeline when answering the second type of question.

Next we propose that [semantic actions](../components/Actions.md) and [rewriting rules](../components/Rules.md) should be developed. Reasoning in EBA is performed on a graph, where concepts represent nodes within this graph. The goal of actions is to produce real data for these concepts. For instance, if a user asks 'show me all products', EBA will reason about the concept `wmt:Products` during reasoning time. During execution time, when EBA is ready to produce a response to this question and should be able to produce real data via an executor function. This function may make a call to an external API or database to retrieve the data. A rewriting rule, on the other hand, represents a kind of translation between concepts. Typically, we will translate higher level concepts into lower level concepts.

Lastly, we encourage the development of visualizations for the data you are producing from your actions. All of the data produced in your actions will be passed to your front end visualizers so that you can customize the visualization of your data. Visualizers are implemented as front end [assets](../lab/Assets.md).
