#  Amplification in natural language understanding

Let's examine the ways in which Watson Assistant (WA) boosts natural language understanding.

When conversing with WA, it's enough to mention certain concept once in a pattern for it to be able to recognize it in various future contexts. WA records stable morphological and syntactical features for concept so it becomes identifiable thereafter.
1. Every pattern is automatically extended with synonyms using an embedded, extendable, thesaurus. For example it's enough to mention "merchandise" to get "product" for free (no additional training).
1. Every sentence is automatically checked for common misspellings and corrected version along with original one are considered as candidates in reasoning process.
1. For every sentence WA detects language, non-English input is automatically translated and translated version is considered as another candidate in reasoning process.
1. Concepts-based reasoning allows WA to incorporate permutations for free. For example: `:ActionDelete(data :Product)` will consider "delete product", "remove item", "destroy merchandise", etc.
1. Composability of actions and concepts allows WA to deconstruct complex questions into simple building blocks, this is yet another dimension of permutation analysis you get for free.
1. Ontology-driven polymorphic actions and rules allow WA to apply generic knowledge at scale. For example the `a hasAttribute :Size => :HowBig (a) -> :ActionShow (:SizeValue (:Relation (a)))` rule can handle "how big" style questions for any  entity where 'size' is an attribute, across all connected agents.
1. NLU pipeline remains under the engineer's control. You can enhance or even fully replace it. Here are some examples:
    * You can add/replace WordNet based synonyms with Word2Vec synonyms that are trained on a corpus of articles relevant to your business domain.
    * You can add/replace Duckling-based NL data extraction with Stanford NLP or Watson NLU.
    * You can use Watson NLC for high level intent classification and its output can be used in downstream reasoning.
    * You can even intercept reasoning pipeline in the middle of a conversation and apply a completely different approach to handle NL questions like we do in our Riddle and Zork examples.

So just one pattern will receive a boost factor as cardinality of the cartesian product:

`portable NL pattern X auto synonyms X spell checking X auto translation X permutations X composability X polymorphism`
