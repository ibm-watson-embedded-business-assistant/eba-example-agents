## Annotate endpoint

This annotate endpoint is used to introduce concepts into the parse tree. The concepts introduced into the tree during this process will serve as a kind of starting point for reasoning. It is important to note that, for a given user question, this endpoint is run in an iterative process until the state of the anntoation tree is stable. For instance, introducing a set of concepts into the tree on iteration 1, will cause iteration 2 to run. Once there are no new changes, the annotation process will terminate. This means that buggy code, i.e. code that constantly updates the tree, can lead to an infinite process. Please check your Debug logs to identify such cases. Within this endpoint, you have access to the entire parse tree--`params.input.tokens`. You will note that a token within this tree is the composition of two data elements `annotations` and `token`. Annotations refer to the concept annotations for a given token. A single annotation will store the name of the concept as well as the confidence score for that annotation. Token refers to the actual NLToken, which contains data such as part of speech tagging, lemmitization, and synonmys list. Within our [eba helpers](../NodeHelpers.md), we have provided a set of useful functions for transforming this parse tree as well as introducing new concept annotations into it. 

Note that annotation is particulary useful for cases where named entity detection is required. Rather than asking: show me products for "IBM", where the company is denoted by quoted strings, we should simply ask: show me products for IBM. With named entity recoginition, IBM can be annotated as a `:Company` concept.

Below is an example that simulates how a named entity recognition algorithm might be applied within our annotation process.

Example:
```
const eba = require('eba');
const api = require('./client-api.js');
const _ = require('lodash');

module.exports.main = async (params) => {
    // constructs original sentence as flat list of tokens
    const tokens = _(eba.flattenTree(params.input.tokens)).map('token').sortBy('id').value();

    // get known entites from storage
    const knownNames = await api.getKnownNames();

    // pattern matching for named entities across tokens
    const matches = getMatches(tokens, knownNames);

    // insert matching annotations into existing tree
    const namedEntityTree = eba.mapTree(params.input.tokens, (tt) => {
        const match = _.find(matches, ({name, tokens}) => _.some(tokens, ({id}) => id == tt.token.id));
        return (match) ? eba.insertAnnotation(tt, match.name) : tt;
    });

    return new eba.Result(namedEntityTree);
};
```

