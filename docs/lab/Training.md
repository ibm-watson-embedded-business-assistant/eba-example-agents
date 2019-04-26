## Training tab

EBA allows an agent to be trained in order to be able to answer natural language questions which are not covered by NL patterns. The training is based on samples - question-explanation pairs where explanation shows how a question can be understood.

### Samples table

In this table you can provide training samples. The table has three columns:

1. Question - a natural language question you want EBA to understand;
2. Explanation - an explanation of a question from the column #1 (an alternative way to ask a question which EBA can understand);
3. Context (optional) - for certain questions you may need some data to be in the context. You can put natural langauge question which produces the necessary context in this column.

It is very important that all the questions you put in columns "Explanation" and "Context" are understood by EBA. It means if you ask a question from explanation column of an every sample in a regular EBA conversation you should see the expected answer.

### Run a training job

To run a training job simply click "Run training" button. The training could take time depending on amount and complexity of samples you have. The training process is a non-blocking process - you may switch to another tab or to another agent or even close EBA. Once the training completes you will see updated status next to "Run training" button. There will also be a link "show details" to see training results - all the natural language patterns and rules EBA generated.

EBA will also generate the spelling for concepts which don't have one in agent's ontology. You may override the generated spelling by providing your own variant in the [Concepts tab](Concepts.md).
