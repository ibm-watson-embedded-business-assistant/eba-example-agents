## EBA agent training

EBA team is announcing _agent training_--a feature which can have wide effects on agents and developers alike. Represented as a table within our development lab, agent training allows developers to teach their agents new patterns, rules, and spellings using natural langauge only. This _trained_ knowledge becomes part of the agent itself, just as if it were programatically developed, making it completely portable. Consequently, this feature intimates a shift in paradigm for developers. It allows them to implement the most atomic and essential elements of their agent, while leaving more high level and complex cases of NLU to be built on top of this through the use of NL training.

[![Agent training](../images/agent-training.png "Agent training")](../images/agent-training.png)

### How to train your agent

Training is comprised of a set of entries, where each entry is a triple consisting of an optional context, a question, and a more detailed explanation of the question. Training set entries are processed one entry at a time, from top to bottom. This means that, for instance, having explained to the system what 'the best mailing' means, we can reuse this expression in the explantation of a subsequent entry.

To clarify, you should keep in mind the role of each element within this triple:
- *context* -- any existing context which is required for the question and explanation. This is particularly useful for cases where a direct or indirect reference is used to refer to prexisting entities, e.g. 'those mailings' or 'this order'.
- *question* -- the high level question or paraphrase you want the system to understand. This question can contain new words and concepts not previously expressed within the agent.
- *explanation* -- the atomic and lower level explanation to your question. Developers should take care to ensure that the explanation is correctly understood by the machine. Running your explanation in the chat with the suffix `||debug` will allow you to verify the system's understanding.
  
