## Fallback Endpoint

The *fallback* endpoint can be used to configure a default fallback process in the case that the user's question was unanswered. For example, if you are building a domain about order management but the user inputs questions which are irrelevant or unhandled, you may wish to defer them to a quick wikipedia search for their question. Note that we have provided an entire [fallback sample agent](../../../Wikipedia.md) to demonstrate this feature. Such fallbacks can significantly improve the user experience.

Below is an example that illustrates of to render a set of wikipedia articles as a fallback.

Example:

```
const _ = require('lodash')
const wikipedia = require('./wikipedia')

module.exports.main = async (params) => {
    let question = params.input['@question']
    let articles = await wikipedia.search(question)
    if (_.isEmpty(articles))
        return { output: null }
    else
        return {
            output: {
              name: 'wikipedia:ArticlesMessage',
              type: 'data',
              tags: ['fallback'],
              data: {
                name: 'wikipedia:Articles',
                data: articles,
                text: 'The following article might be relevant to your question.'
              }
            }
        }
}
```


