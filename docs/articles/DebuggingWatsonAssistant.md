## Debugging EBA

EBA was created with transparency in mind – we did not want to provide users with another AI black box. As such, the assistant provides users a variety of open debug capabilities to inspect every relevant aspect of its own understanding. You will find these introspection capabilities useful in different steps of the assistant's reasoning pipeline.

### Pipeline overview

Before diving into an exposition of the different debug capabilities available, you will want to ensure that you understand _how_ EBA works. That is, you should have a good grasp of our collaborative reasoning pipeline. We provide an brief enumeration below.

 - [Encoded conceptual knowledge](#ontology): Developers encode a set of concepts and relationships to tell our assistant what it _can_ understand and reason about. Without conceptual entities, there is effectively nothing to reason about.
 
 - [SyntaxTree creation](#annotation): A user's natural language question is broken down into its morphological and syntactical features and represented as a tree.
 
 - [Annotation](#annotation): Natural language within a user's syntax tree is annotated or mapped to conceptual entities.
 
 - [Reasoning](#reasoning): Given a starting point of conceptual entities, EBA considers all possible outcome paths and reasons to produce the most relevant one.
 
 - [Execution](#execution): Having settled on the appropriate action path, EBA executes that path including any side effects it may produce.

With this pipeline in view, lets walk through the some of the common bugs we have seen associated with each step.

#### Ontology

An ontology in EBA represents a set of concepts and a set of relationships between them. A developer should encode his business domain as an ontology. The main features an ontology should capture are showability, singular-plural references, attribute definition, spelling, and any other custom predicates aligned to a particular use case. In the course of development, it is possible to create an ontology which is incomplete or not well defined.

*Common Bugs:*
  - _No showable data_: It is possible for a particular NLU variant to be correctly defined and understood but to not be selected for execution in the case that the data being produced by this variant is not showable. In such cases, developers should survey their ontology to confirm that the business entities they intend to show users actually subclass from the concept `:Showable` in the 'Subclass' tab.
  
  - _Deficient spelling_: If you notice a generic response from Watson, such as 'Here is what you are looking for', it is likely that your business entities lack any associated spelling. In such cases, developers should survey their ontology to confirm whether the relevant concepts actually contain spelling in the 'Spelling' tab.
  
  - _Unapplied filter_: A collection of entities can be filtering according to its component attributes out-of-box in EBA. However, if a developer fails to define the singular-plural relationship between two entities, there will be no way for the system to understand that a collection can be filtered by a given attribute, since attributes are defined in terms of the singular entity. If you have defined the relevant attributes and entities but are not able to filter a collection by these attributes, developers should survey their ontology to inspect whether plural entitles contain a reference to their singular counterparts within the 'List of' tab. 

#### Annotation

After asking the assistant a question, hover over your question to see an information icon appear in the top right portion of the message. Clicking this icon will reveal a tokenized representation of your original question. This tokenized representation will contain a part of speech (PoS) breakdown of the questions along with the concept annotations selected by the assistant. 

![syntatic-parsing.png](../assets/images/syntatic-parsing.png#zoom=50%)

In the tree above, you find a topological breakdown of a user's question, including the lemmas, part of speech, and dependency relationship of each token. It is important to consider that this tree serves as a starting point for the rest of the reasoning process and that EBA is sensitive to the features of this tree. A side effect of this is that EBA does not recognize concepts on a keyword basis, but rather it considers the context in which the word is used. Consider the following distinct usages of the word 'weather' in the sentences 'how is the weather?' and 'can we weather the storm'. The keyword 'weather' is used differently in each sentence, and EBA is intelligent enough to distinguish each instance. Annotations, which developers supply via NL patterns, are introduced into the syntax tree only in cases where their respective topologies match.

*Common Bugs*: 
  - _Unapplied annotation_: As a result of syntax parsing, a given annotation may fail to be applied to a particular question due to the differing syntactical context in which it is used. For instance, a pattern such as `how is the {weather|:Weather}` will not be applied to the question 'can we weather the storm?' as the term 'weather' has a different syntactical context in this pattern, e.g. one is a noun, the other is a verb. If you notice that an annotation is not applied to a particular question when you would otherwise expect it to be applied, please verify that the topology of the annotation is aligned with the topology in the target questions. You may always input your pattern as a question to EBA and view its Syntax Tree within our Question Details view. 
 
  - _Syntax Misclassification_: EBA uses a third party library to assist in syntactic parsing. In cases where a particular token is ambiguous or not well recognized, an incorrect classification may be produced. For instance, within the context a particular business domain, the term 'BOL' can serve as a acronym for 'bill of lading'. In standard English vernacular; however, there is no apparent meaning for the term 'BOL'. Consequently, it is possible for this term to receive a incorrect classification, e.g. 'BOL' can be annotated as a kind of determiner such as 'the' or 'an' instead of a noun in its own right. The solution to such cases is to construct a pattern where the term is syntactically aligned. In this case, you can enter a pattern like `show me the {BOL|:BillLading} for this order`. The system will not treat 'BOL' as a determiner in this case as the word 'the' is already present in the pattern. This will enable expected behavior for this acronym. 

#### Reasoning

Based on the existing conceptual knowledge derived from the syntax and annotation process, EBA will perform reasoning to decide which set of actions can be taken to resolve a particular question. EBA will iteratively evaluate what actions can be applied in a sequence to resolve the user's question, by outputting the variant with the best concept coverage, i.e. the variant which utilizes the maximum understanding.

*Common Bugs*:
  - _Fails understanding threshold_: EBA is a reasoning machine designed to understand each component of a user's request. If EBA determines that _not enough_ of a question can be understood, it will not process this question, but, instead, it will allow the question to be processed using our [fallback mechanism](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/blob/master/docs/lab/endpoints/Fallback.md). Currently, the understanding threshold is a reasoning score of 0.70 percent. If your question has a reasoning score below this value, it means that some significant portion of the question is not understood. Developers should consider consuming any unused concepts within their actions assuming that they are semantically appropriate. You can check the score of a particular variant by running your question in debug mode, i.e. by asking the question with `||debug` at the end of it.
  
 - _Invalid action signature_: An action can only be considered for execution during the reasoning process if and only if all of the components of its input signature are present. For instance, consider an action declared as follows. `demo:GetSuppliersForItem demo:Suppliers(data demo:ItemID) -> data demo:Suppliers`. This action can only be considered for execution if there is some other action which can be executed to produce `data demo:ItemID`. Consider an action declared as follows. `demo:GetSuppliersForItem demo:Suppliers(demo:ItemID) -> data demo:Suppliers`. This action can only be considered for execution if the concept `demo:ItemID` is present within the annotation tree. Generally speaking the root concept within a signature will be the same as the output concept. Other common invalid signatures include signatures with duplicate concepts, e.g. `:Mailings(:Timeframe, :Mailings)`. This action implies that the concept `:Mailings` occurs within the sentence twice, which is often not the case. Additionally, signatures which confuse qualifiers with actual data, e.g. `:SalesOrders(:Customer(data :CustomerID))`. This action implies that the concept `:Customer` and existing customer id data must be present. This represents a fully qualified case, e.g. when the user asks 'show me all sales orders for _customer_ 12345'. It is best to leave the keyword 'customer' as optional, e.g. `:Salesorders(optional :Customer(data :CustomerID))`
 
#### Execution
 
 Once EBA reasoning core determines the optimal understanding variant, only that variants will be executed. This means that all code, including any side effects, will be executed. Any time runtime errors will be detected and logs will be shown within the 'Debug' tab inside the development lab.

### Built-in Debug Tooling

#### Information space

After the assistant responds to your question, you will be able to view an outline of its reasoning in the information space. Select the graph icon in the top right corner of the content tab to view the information space. The information space is represented as a set of nodes and links which contain drill-down information. Each question begins with a question node and is linked to other nodes which represent your original question. These nodes are subsequently linked to concept nodes (solid-filled colors) and data nodes (white-filled colors). Concept nodes reveal the concepts associated with your tokens while data nodes contain the raw data the assistant associated with their respective concept. Data is gathered after executing actions. From this view, you can inspect the annotations, links, actions, and data selected and produced by the assistant for each question.

![information-space.png](../assets/images/information-space.png#zoom=50%)

*Common Bugs*: If you notice an unsatisfying result from the assistant, you should first ensure that data nodes were actually generated for your domain concepts. Furthermore, you should ensure that the data returned from your assistant is correct. If your question does not contain data nodes, it is likely due to an invalid configuration within the assistant, e.g. undeclared patterns, invalid action signatures, invalid ontology, etc. If you have data nodes, but the data is incorrect, the problem lies within the action that produced this data. Consult the Debug Tab within our lab to inspect the action itself. If you have both data nodes and the correct data, then the issue likely lies in showability. Ensure that your domain entity is showable by subclassing it from the `:Showable` concept within the ontology tab or else ensure that your frontend visualization assets correctly render your data. 

##### Auxiliary nodes

The information space also contains a set of auxiliary nodes, viz. token, meta, and variants. Token provides detail into each token of your sentence, including a full CoNNL breakdown as well as synonyms that the assistant can substitute in place of the current token. Meta provides meta data of the entire question and answer exchange. Variants will show the understanding variants that the assistant reasoned about along with their respective scores.

#### Reasoning in debug mode

To bring alternative understandings into the information space, simply asking your question and append `||debug` to the end of it, e.g. "show me all invoices||debug". 

![alternative-intrepretations.png](../assets/images/alternative-intrepretations.png#zoom=50%)

The information space will also now display all alternative variants. As a fair warning, the assistant is able to reason about many thousands of alternatives at a time, so this view can become too large for more complex questions. In order to view one particular path in isolation, you should double click the `message` node associated with that variant. Double clicking will highlight this specific variant path and hide the remaining paths for easier introspection.

![alternative-path.png](../assets/images/alternative-path.png#zoom=50%)

#### Debug tab

Actions allow the assistant to perform api requests and other operations to produce real data. The Debug tab is created to provide insight into the FaaS code invocations, timings, and logs. Consequently, this tab is the best place to debug any runtime errors hindering the assistant.

*Common Bugs*: If you see a 401 error after asking a question, it is likely due to an invalid api credential. Supply valid credentials using the Secrets or Settings tab. If you see a 500 error after asking a question, the problem lies in the api you are connecting to. If you see that null data is produced within the information space, there may likely be a runtime error within your action body itself.

#### Browser console

The development lab allows developers to apply custom frontend styles when rendering their data. These styles run within the browser and can viewed within the inspector itself.


