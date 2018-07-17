## Debgguing Watson Assistant

Watson Assistant was created with transparency in mind – we did not want to provide users with another AI black box. As such, the assistant provides users a variety of open debug capabilities to inspect every relevant aspect of its own understanding. You will find these introspection capabilities useful in different steps of the assistant's reasoning pipeline.

#### Syntactic Parsing

After asking the assistant a question, hover over your question to see an information icon appear in the top right portion of the the message. Clicking this icon will reveal a tokenized representation of your original question. This tokenized representation will contain a part of speech (PoS) breakdown of the questions along with the concept annotations selected by the assistant. 

![syntatic-parsing.png](../Lab/assets/images/syntatic-parsing.png#zoom=50%)

*Common Bugs*: Parsing and annotation are earlier steps in the assistant's pipeline and can be particularly useful to consult when you notice an empty response from the assistant. A common cause of such responses is unannotated tokens, which result from a lack of relevant patterns. The concepts used in these annotations are the concepts that will be used later in the reasoning pipeline, so you will want to ensure that the assistant can correctly annotate your input, and, futhermore, that the actions you have declared correctly require these concepts. For instance, if you have a pattern `show me {x|:X}`, but you do not have any actions which produce `data :X`, you will likely get an unsatisying response from the assistant. It is through patterns that you can influence the assistant's understanding of parsing and annotations. It is through actions, that you link these concepts together to produce data.

#### Information Space

After the assistant responds to your question, you will be able to view an outline of its reasoning in the information space. Select the graph icon in the top right corner of the content tab to view the information space. The information space is represented as a set of nodes and links which contain drill-down information. Each question begins with a question node and is linked to other nodes which represent your original question. These nodes are subsequently linked to concept nodes (solid-filled colors) and data nodes (white-filled colors). Concept nodes reveal the concepts associated with your tokens while data nodes contain the raw data the assistant associated with their respective concept. Data is gathered after executing actions. From this view, you can inspect the annotations, links, actions, and data selected and produced by the assistant for each question.

![information-space.png](../Lab/assets/images/information-space.png#zoom=50%)

*Common Bugs*: If you notice an unsatisfying result from the assistant, you should first ensure that data nodes were actually generated for your domain concepts. Furthermore, you should ensure that the data returned from your assistant is correct. If your question does not contain data nodes, it is likely due to an invalid configuration within the assistant, e.g. undeclared patterns, invalid action signatures, invalid ontology, etc. If you have data nodes, but the data is incorrect, the problem lies within the action that produced this data. Consult the Debug Tab within our lab to inspect the action itself. If you have both data nodes and the correct data, then the issue likely lies in showability. Ensure that your domain entity is showable by subclassing it from the `:Showable` concept within the ontology tab or else ensure that your frontend visualization assets correctly render your data. 

#### Auxilary Nodes

The information space also contains a set of auxilary nodes, viz. token, meta, and variants. Token provides detail into each token of your sentence, including a full CoNNL breakdown as well as synonyms that the assistant can substitute in place of the current token. Meta provides meta data of the entire question and answer exchange. Variants will show the understanding variants that the assistant reasoned about along with their respectives score.

#### Alternative Understandings

In addition to the variant nodes within the information space, the assistant provides user's a convenience to view all possible interpretations for a given question. By asking "show me reasoning meta", the assistant will show the alternative understandings for a particular question.

![alternative-intrepretations.png](../Lab/assets/images/alternative-intrepretations.png#zoom=50%)

#### Reasoning in Debug Mode

To bring alternative understandings into the information space, simply asking your question and append "||debug" to the end of it, e.g. "show me all invoices||debug". The information space will now display all alternative variants. As a fair warning, the assistant is able to reason about many thousands of alternatives at a time, so this view can become too large for more complex questions. In order to view one particular path in isolation, you should double click the `message` node associated with that variant. Double clicking will highlight this specific variant path and hide the remaining paths for easier introspection.

![alternative-path.png](../Lab/assets/images/alternative-path.png#zoom=50%)

#### Debug Tab

Actions allow the assistant to perform api requests and other operations to produce real data. The Debug tab is created to provide insight into the FaaS code invocations, timings, and logs. Consequently, this tab is the best place to debug any runtime errors hindering the assistant.

*Common Bugs*: If you see a 401 error after asking a question, it is likely due to an invalid api credential. Supply valid credentials using the Secrets or Settings tab. If you see a 500 error after asking a question, the problem lies in the api you are connecting to. If you see that null data is produced within the information space, there may likely be a runtime error within your action body itself, e.g. null pointer.

#### Browser Console

The development lab allows developers to apply custom frontend styles when rendering their data. These styles run within the browser and can viewed within the inspector itself.


