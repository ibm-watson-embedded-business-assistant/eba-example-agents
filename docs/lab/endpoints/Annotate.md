## Annotate endpoint

This annotate endpoint introduces concepts into the parse tree. It serves as a mechanism for communicating with any external NLU services to place certain concept annotations into our reasoning pipeline. The concepts introduced into the tree during this process will serve as a kind of starting point for reasoning. Within this endpoint, you have access to the entire parse tree (`params.input.tokens`) as well as the user's original input (`params.input.text`). A token within this context is the composition of two data elements, viz. annotations and syntax token. Annotations refer to the concept annotations for a given token. A single annotation will store the name of the concept as well as the confidence score for that annotation. The syntax token refers to the actual NLToken, which contains data such as part of speech tagging, lemmatization, and synonyms list. Within our [eba helpers](../NodeHelpers.md), we have provided a set of useful functions for transforming this parse tree as well as introducing new concept annotations into it. 

The annotation endpoint is particularly useful in enabling named or custom entity detection. It is common that within any business domain there is a dictionary set of named values which should be semantically annotated, e.g. order IDs and customer names. These values often cannot be known in advance and they should be dynamically updated and annotated to remain in parity with underlying data sources. Such named entity detection enables our system to reason about custom entities in a strongly typed fashion. For instance, we can understand "International Business Machines" as a _customer_ rather than a _supplier_. Another benefit of named entity detection is that it allows users to naturally ask question without forcing them to use to follow a rigid pattern or denoting certain entities with quotation marks. For instance, instead of asking _show me products for "International Business Machines"_, where the company is delineated by quotation marks, a user can more naturally ask _show me products for International Business Machines_. 

Below is an example that simulates how a named entity recognition algorithm might be applied within endpoint. If you load this code and ask the question `show me orders for International Business Machines||annotate`, you should see annotations for `om:CustomerName` in the annotation tree. 

Example:

```
const eba = require('eba')
const _ = require('lodash')

// simulates a call to external annotation service
// note: response is hard coded for question: "show me orders for International Business Machines"
const getNamedEntities = () => {
  return [
    { name: 'om:CustomerName', meta: { companyCode: 'IBM' }, start: 19, end: 50 }
  ]
}

module.exports.main = async (params) => {
  // gets the user input as is
  const question = params.input.text
  
  // gets named entities from question
  const namedEntities = getNamedEntities()
  
  // insert annotation based on named entities
  const namedTree = eba.mapTree(params.input.tokens, (tt) => {
    const namedEntity = _.find(namedEntities, ({start, end}) => {
      return start <= tt.token.start && tt.token.start < end
    })

    return (namedEntity)
      ? eba.insertAnnotation(tt, namedEntity.name, 1.0, namedEntity.meta)
      : tt
  })
  
  // return the annotation tree as Result
  return new eba.Result(namedTree)
}
```

