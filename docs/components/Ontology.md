## Ontology

We begin our understanding of ontology by first looking at the notion of a concept. A concept is simply an object in your domain that the assistant is able to recognize. For example, in the marketing domain, we have concepts for mailings, open-rates, click-rates, etc. A concept in denoted by a colon `:`. For example `:Mailings` denotes the mailings concepts. Concepts should additionally be prefixed with the domain of your skill. For example, `marketing:Mailings` signifies the mailings concept in the marketing domain. 

Concepts and their relationship to other concepts are definined in an ontology. In fact, an ontology is simply a set of relationships between different concepts in rdf format, i.e. *subject-predicate-object* triples. Consider the following examples below. 

```
:OpenRate subClassOf :Showable
```

Here we specify that :OpenRate is a concept which subclasses or dervies from the :Showable concept. This system is able to visually render all :Showable objects, so we are effectively making our open rate concept viewable to the end user.


```
:Mailings isListOf :Mailing
```

Here we specify that the :Mailings concept is a list composed of individual :Mailing concepts. This is useful for actions that the assistant performs when working with collections.

## Attributes

Typically concepts are used to model well formed business entities within our domain, and, consequently, the assistant is able to understand a concept as being composed of a set of attributes. For example, the :Mailing concept will contain attributes for subject line, recpeint, send date, etc. Such a relationship might be specified in the skill's ontology as follows.

```
:SubjectLine subClassOf :Attribute
:Mailing hasAttribute :SubjectLine
```