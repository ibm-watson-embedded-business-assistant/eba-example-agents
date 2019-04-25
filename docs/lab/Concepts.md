## Concepts tab

This tab is responsible for managing your skill's concepts.

### Naming

A concept will require a `:` deliminated name of the following form (domain):(concept), where the domain is optional, but encouraged. For example, `marketing:Mailings` and `:Size` is are valid concept names. Ill formed names will be rejected. Note that the domain can be scoped to your organization, e.g. `wca:Mailings` for Watson Campaign Automation (wca). 

### Spelling, subClasses, and listOfs

The most common ontology predicates have been factored out into their own tabs within the concepts table. It is important to understand each. Spelling is useful for natural language generation (NLG). EBA does not produce hard coded, canned responses to user questions. It relies on NLG to reply intelligently to users. Providing a spelling of your concept enables the system to reply to you in an intelligent and expected manner. SubClasses are used to model a hierarchical relationship between concepts. For instance, anything which is a subclass of `:Showable` concept is able to be shown to the user. isListOf is a predicate used to distinguish collections from the singular counterparts.

### Attributes

In order to attach an attribute to a concept, click on the attributes tab link, which will open a new table popup. An attribute must designate both the name of the attribute concept as well as the property field name that the assistant will search for when performing an data operations involving this attribute. For example, a `:SalesOrder` concept may contain an `:CustomerID` attribute, which we expect as the following key in a json payload: "customer_id".


### Ontology

The ontology tab link is provided to developers in order to inspect existing ontology as well as to add additional ontology predicates outside of spelling, subClassOf, and isListOf. You can expand your ontology in this tab by entering an RDF triple: subject, predicate, and ontology. Note that the spelling predicate is not enabled to be viewable in this tab. Deleting an ontology entry in this tab may have side effects in other existing components. For example, if we remove the triple `:CustomerID subClassOf :Attribtue` entry. You will see this change reflected in the concepts table itself, but, more importantly, any actions relying on this previous relationship may be broken. Our lab ensures that your changes will be propagated and reflected accordingly through the skill, but it is the responsibility of the developer to ensure that their components are consistent.

### Notes

Notes are simply plain text descriptions regarding a particular concept. Feel free to use notes in any way to suits your needs. They may be particularly useful in denoted experimental concepts or disambiguation in the case of collaborative development.

[Learn more about concepts and ontology](../components/Ontology.md)