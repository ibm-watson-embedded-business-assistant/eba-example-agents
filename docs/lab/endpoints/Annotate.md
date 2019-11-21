## Annotate endpoint

This annotate endpoint introduces concepts into the parse tree. It serves as a mechanism for communicating with any external NLU services to place certain concept annotations into our reasoning pipeline. The concepts introduced into the tree during this process will serve as a kind of starting point for reasoning. Within this endpoint, you have access to the entire parse tree (`params.input.tokens`) as well as the user's original input (`params.input.text`). A token within this context is the composition of two data elements, viz. annotations and syntax token. Annotations refer to the concept annotations for a given token. A single annotation will store the name of the concept as well as the confidence score for that annotation. The syntax token refers to the actual NLToken, which contains data such as part of speech tagging, lemmatization, and synonyms list. Within our [eba helpers](../NodeHelpers.md), we have provided a set of useful functions for transforming this parse tree as well as introducing new concept annotations into it. You can also see the format description of parse tree [here](#parse-tree-format).

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
    
    // see how many named entities a given token matches
    const matches = _.filter(namedEntities, ({start, end}) => {
      return start <= tt.token.start && tt.token.start < end
    })
    
    // insert annotations for each match
    _.forEach(matches, (namedEntity) => {
      tt = eba.insertAnnotation(tt, namedEntity.name, 1.0, namedEntity.meta)
    })

    // return the mutatated token
    return tt
  })
  
  // return the annotation tree as Result
  return new eba.Result(namedTree)
}
```

## Parse tree format

The parse tree is represented in JSON as a tree of tagged tokens. The tree itself is represented as a JSON array of two elements, where the first element is a root label, the second on is a sub forest:
```
[
  rootLabel,
  [
    subTree1,
    subTree2,
    ...
  ]
]
```

The tagged token is represented as a JSON object with POS token and annotations:
```
{
  token: {
    id (number):         the unique token number which represents the position of the word within a sentence (starting from 1),
    start (number):      the starting index of the token form within a sentence,
    length (number):     the length of the token form,
    postag (string):     POS tag reported by POS parser,
    cpostag (string):    CPOS tag reported by POS parser,
    deprel (string):     the dependency relation reported by POS parser,
    form (string):       the original form of the token,
    lemma (string):      the lemma reported by POS parser,
    synonyms ([string]): the list of synonyms
  }
  annotations: [{
    id (string):           the unique annotation ID,
    concept (string):      the concept name,
    confidence (number):   the confidence reported by annotator (must be between 0 and 1),
    matchingType (string): the matching type
  }]
}
```

For NL-patterns based annotations the confidence will be always 1.0 - the confidence can be set to any value between 0 and 1.0 by custom annotators.

The matching type shows how token from a question matches against tokens stored in NL patterns. It can take tree values:
1. `full_match` - both POS and CPOS tags match;
2. `part_match` - either POS or CPOS tag matches;
3. `synonym` - there is no direct match by lemmas but there is an intersection by synonyms.

Here is an example of parse tree for the question "tell me a joke":

```
[ { annotations:
     [ { concept: ':ActionShow',
         confidence: 1,
         id: 'e93f47f301944dc88ea0ebf280e26fd7cd8d5d49',
         matchingType: 'full_match' } ],
    token:
     { cpostag: 'VERB',
       deprel: 'ROOT',
       form: 'tell',
       id: 1,
       lemma: 'tell',
       length: 4,
       postag: 'VB',
       start: 0,
       synonyms: [ 'assure', 'differentiate' ... ] } },
  [ [ { annotations:
         [ { concept: ':ActionShow',
             confidence: 1,
             id: 'e93f47f301944dc88ea0ebf280e26fd7cd8d5d49',
             matchingType: 'full_match' } ],
        token:
         { cpostag: 'PRON',
           deprel: 'iobj',
           form: 'me',
           id: 2,
           lemma: 'me',
           length: 2,
           postag: 'PRP',
           start: 5,
           synonyms: [ 'maine', 'pine tree state' ] } },
      [] ],
    [ { annotations:
         [ { concept: ':Joke',
             confidence: 1,
             id: '7ab76d6b16b256df5466258ac0474af26522f3ee',
             matchingType: 'full_match' } ],
        token:
         { cpostag: 'NOUN',
           deprel: 'dobj',
           form: 'joke',
           id: 4,
           lemma: 'joke',
           length: 4,
           postag: 'NN',
           start: 10,
           synonyms: [ 'antic', 'caper' ... ] } },
      [ [ { annotations:
             [ { concept: 'lang:Article',
                 confidence: 1,
                 id: 'b93af44fa57f54e29bd3c7585a65ccbbcfa27ea0',
                 matchingType: 'full_match' } ],
            token:
             { cpostag: 'DET',
               deprel: 'det',
               form: 'a',
               id: 3,
               lemma: 'a',
               length: 1,
               postag: 'DT',
               start: 8,
               synonyms: [ 'adenine', 'amp', 'ampere' ... ] } },
          [] ] ] ] ] ]
```
