## Rules

Rewriting rules are a way to transform one single concept into a cluster of other related concepts. Each skill may contain a set of rules, where each rule is designated by a set of [constraints](#constraints), [input](#input), and [output](#output). Often times natural language can be very short and allow for the omission of certain words or concepts. Rewriting rules enable the assistant to handle such cases effectively. While our concepts are well formed, we anticipate that users will use imprecise langauge to inquire about them. For example, we might expect a user to ask for "the best mailing" or "trending products". We can implement rewriting rules to reduce higher-level notions such as "best" and "trending" into a cluster of concepts that the assistant can more easily reason about. For example consider the rewriting rule below.

```
:TheBest(:Mailing) -> :HighValue(:ClickToOpenRate, :Mailings)
```

Here we have defined the best mailing to be translated into lower level concepts. :HighValue is a concept used by the system to return highest quartile data points and :ClickToOpenRate is an attribute of :Mailing. We are effectively programming our assistant to recognize "the best mailings" as being equivalent to "mailings with clickToOpenRate attribute in the highest quartile".


### Constraints

Constraints are simply a way to qualify your concepts using rdf triples. As in the case of ontology, constraints follow the format of *subject*, *predicate*, *object*, where the subject and object must be either a concept or another symbol and predicate can be anything as long as it is used consistently within your configuration. Constraints are used within Watson Assistant to denote a polymorphic parameter. For instance, `a subClassOf :List` constrains the symbol `a` to be *any* list. Constraints only hold scope local to the signature they are defined in. Within our Lab, a warning will be issued if a constraint is defined but never actually used within the remainder of the signature. Likewise, a warning will be issued a constraint symbol is used within the signature but never decalred. Hence, `a subClassOf :RankingMetric => :Mailings -> data :Mailings` contains a superfluous constraint, while `:Mailings(a) -> :Mailings` contains an undeclared symbol `a`. A valid signature would be the following `a subClassOf :RankingMetric => :Mailings(a) -> data :Mailings`. Additionally, constraints may make use of a wildcard symbol to denote that it accepts any type, e.g. `a isListOf _` denotes a constraint `a` that is a list of anything.

In certain cases, it is possible to refer to a constraint paramter multiple times within a single signature, so it is necessary to distinguish between these references. For instance, `a subClassOf :Showable => a(reference:Direct, context data a @src)` makes uses of the constraint parameter `a` twice. To distinguish the second occurence of the parameter, we add an alias: `@src`. Now, within the body of our action, we can require data by indexing our deps as "src".

### Input and output

Both input and output to rules are represented as a tree of concepts. There are no `paramTypes` or `queryTypes` associated with these concepts. A rule will effectively translate the input (higher level) into the output (lower level).

