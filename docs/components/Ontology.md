## Ontology

We begin our understanding of ontology by first looking at the notion of a concept. A concept is simply an object in your domain that the assistant is able to recognize. For example, in the marketing domain, we have concepts for mailings, open-rates, click-rates, etc. A concept in denoted by a colon `:`. For example `:Mailings` denotes the mailings concepts. Concepts should additionally be prefixed with the domain of your skill. For example, `marketing:Mailings` signifies the mailings concept in the marketing domain. 

Concepts and their relationship to other concepts are defined in an ontology. In fact, an ontology is simply a set of relationships between different concepts in rdf format, i.e. *subject-predicate-object* triples. Consider the following examples below. 

```
:OpenRate subClassOf :Showable
```

Here we specify that :OpenRate is a concept which subclasses or derives from the :Showable concept. This system is able to visually render all :Showable objects, so we are effectively making our open rate concept viewable to the end user.


```
:Mailings isListOf :Mailing
```

Here we specify that the :Mailings concept is a list composed of individual :Mailing concepts. This is useful for actions that the assistant performs when working with collections.

Certain native predicates have significant meaning for our system. We will detail a few of them below.
- `subClassOf`  -- `a subClassOf b` means that a inherits all of the attributes which b contains. This is particularly useful in the cases that we need to model a hierarchical domain. For instance, `:SalesOrder subClassOf :Order` allows a particular entity to auto derive attributes from its base concept.
- `isListOf`    -- `a listOf b` means that a is a collection of b. This enables our system to automatically perform data operations on top of collections. For instance, `:Orders isListOf :Order` and `:Order hasAttribute :Quantity`, we immediately begin to ask questions such as 'show me all orders where quantity is above 500'. 
