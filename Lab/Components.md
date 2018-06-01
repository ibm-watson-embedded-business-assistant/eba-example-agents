# Core Components

This document covers each of the core components that constitute a skill. It is important to note that Watson Assistant follows an ontology based paradigm, meaning that it derives understanding about the world based on a relationship of concepts. This is in contrast to most other systems which are intent based and depend on predicate logic.

At a high level, the assistant is composed of an [ontology](#ontology) of concepts that it is able to recognize and reason about. Natural langauge [patterns](#patterns) help the assistant to perform natural langauge understanding, linking language tokens to appropriate concepts. In the process of reasoning about a question, the system considers all possible outcomes it can take given a set of [actions](#actions) and [rules](#rules), ultimately selecting the best one or asking for user disambiguation in cases where it is fitting.

### Ontology

Concepts and their relationship to other concepts are definined in an ontology. In fact, an ontology is simply a set of relationships between different concepts. For this reason, the ontology of a given skill should serve as the starting point in development. Consider the following examples below. 

```
:OpenRate subClassOf :Showable
```



 


