## Amplification in natural language understanding

Let's examine the ways in which EBA boosts natural language understanding.

When conversing with EBA, you can mention a certain concept only once in a pattern in order for EBA to be able to recognize it in various future contexts. EBA records stable morphological and syntactical features for concept so it becomes identifiable thereafter.
1. Every pattern is automatically extended with synonyms using an embedded, extendable thesaurus. For example: Without any additional training, it's enough to mention "merchandise" in order to get "product".
1. Every sentence is automatically checked for common misspellings. Both the original version and the corrected version are considered as candidates in the reasoning process.
1. EBA detects the language for every sentence. Non-English input is automatically translated, and the translated version is considered as another candidate in reasoning process.
1. Concepts-based reasoning allows EBA to incorporate permutations without additional training. For example: `:ActionDelete(data :Product)` will consider "delete product", "remove item", "destroy merchandise", etc.
1. Composability of actions and concepts allows EBA to deconstruct complex questions into simple building blocks, this is yet another dimension of permutation analysis you get without additional training.
1. Ontology-driven polymorphic actions and rules allow EBA to apply generic knowledge at scale. For example, consider the following rule: `a hasAttribute :Size => :HowBig (a) -> :ActionShow (:SizeValue (:Relation (a)))`. With this rule, EBA can handle "how big"-style questions for any entity where 'size' is an attribute, across all connected agents.
1. NLU pipeline remains under the engineer's control. You can enhance or even fully replace it. Here are some examples:
    * You can add/replace WordNet based synonyms with Word2Vec synonyms that are trained on a corpus of articles relevant to your business domain.
    * You can add/replace Duckling-based NL data extraction with Stanford NLP or IBM Watson NLU.
    * You can use IBM Watson NLC for high level intent classification and use its output in downstream reasoning.
    * You can even intercept the reasoning pipeline in the middle of a conversation and apply a completely different approach to handle NL questions. Check out our Riddle and Zork examples to see this in action!

Through these mechanisims, a single pattern will receive a boost factor as cardinality of the Cartesian product:

`portable NL pattern X auto synonyms X spell checking X auto translation X permutations X composability X polymorphism`
