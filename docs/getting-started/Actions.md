## Actions

As a quick test of EBA's natural language understanding, we can declare our actions and return hard-coded responses–just to verify that our questions are correctly understood. Once understanding is in place, we can hook up actual API calls to Walmart and return real data.

Let's support the most basic action first: get all trending products for Walmart. In order to do so, we must declare the appropriate action signature.

Action signatures are broken into three components: constraints, inputs, and output. Constraints are optional and can be ommitted. Signatures conform to the following formula: `constraints => input -> output`. Anything to the left of the `=>` is a constraint and should be entered in the Constraint column. The next part should be entered in the Input column, and the last part in the Output column.

| Name                          | Signature                                                 |
| ----------------------------- | --------------------------------------------------------- |
| `wmt:GetTrendingProducts`     | `wmt:Products(wmt:Trending) -> data wmt:Products`         |

Let's reflect on the signature above. We expect questions such as 'show me all trending products' and 'what products are trending?'. We note that `wmt:Products` is the root object in such queries and that the keyword 'trending' is a modifier which qualifies this concept. Hence we define our input as: `wmt:Products(wmt:Trending)`. `wmt:Products` is the root concept and it points to a child concept `wmt:Trending` which modifies it. Lastly, in this action we plan to produce data for products, so we add `data wmt:Products` as the output.

We can add the following hard-coded placeholder action to test EBA's understanding of a question:

```
const {Result} = require('eba');
module.exports.main = () => new Result().setData('wmt:Products', ['product1', 'product2', 'product3']);
```

In this placeholder code, we import our standard [`eba` helpers package](../lab/NodeHelpers.md). This package is useful for working with parameters, results, and other features of our system. In the code above, we are returning a Result which sets data for the `wmt:Products` concept as a hard-coded list of strings (eg. 'product1', 'product2', and 'product3').

Save your changes and try the following questions in the chat: 'show me trending products' or 'what products are trending?'. EBA should respond with the hard-coded list above. You can verify EBA's understanding by clicking the information icon above your original question. This should show you the annotation tree of your question. You can view the complete context of your chat in the Information Space screen, as well as by clicking the graph icon in the top right corner of the page.

Now that we have verified that EBA can understand such questions, we should produce real data from Walmart. In order to use walmart's open API, you will need to register for a free API key at https://developer.walmartlabs.com/. Once you have obtained an API key, switch over to the General tab within our dev lab. In the Secrets panel, add the following name:value pair: `apiKey` : `<value of your own api key from link above>`.

Next, replace the code in your placeholder action with the following:

```
const request = require('request-promise-native')
const eba = require('eba');

const main = ({secrets}) => {
  return request
    .get(`http://api.walmartlabs.com/v1/trends?apiKey=${secrets.apiKey}`)
    .then(JSON.parse)
    .then(({items}) => {
      items.forEach((item) => {
        if (!item.shortDescription)
          item.shortDescription = ""
      })
      return new eba.Result().setData('wmt:Products', items);
    })
    .catch((error) => {
      return { error: `Walmart API error: ${error}` }
    })
}
module.exports = {main}
```

The action above is relatively straightforward. We are performing an http `GET` request to Walmart's /trends api. In this request, we are passing our `apiKey` which we just stored in our Secrets (accessed via `secrets.apiKey`). We then parse the JSON result and perform some minor data processing to ensure that each item returned from the API has a `shortDescription` field (even if the field is empty). Otherwise, the API could return some items where this field is missing. Recall from our ontology entries that `wmt:Products` is a list of `wmt:Product` and that `wmt:Product` is composed of a few fields such as short description. Lastly, we return a Result which sets data as this processed list of items from Walmart.

Save your changes and try out the same questions again. You should see real data returned in this case.

Let's add the remaining actions we want to support for this sample.

| Name                          | Signature                                                                 |
| ----------------------------- | ------------------------------------------------------------------------- |
| `wmt:SearchProductByName`     | `wmt:Product(optional :WithName(data :UserString)) -> data wmt:Product`   |

Here we are defining an action for searching for a specific product by name. `wmt:Product` is the root concept and it can be optionally qualified by a `:WithName` keyword followed by actual string data containing the product name to be searched for. By `:WithName` keyword, we mean a keyword which signifies a name, e.g. 'show me products **named** "Call of Duty"' or 'show me products **with name** "Call of Duty"'. Since we are not using any named entity recognition in this sample, we are supplying the product name within quoted strings. Such quoted strings are denoted by `:UserString` concept. Note that `:UserString` is a convenience concept for local development and is *not* meant for production quality assistants. Named entity recognition for keywords is strongly encouraged in such cases. The output of this action should be data for a single product.

Add the following code into the action body:

```
const request = require('request-promise-native')
const eba = require('eba')

module.exports.main = function (params) {
  let h = new eba.Params(params)
  let nameString = h.get(":UserString")

  return request
    .get(`http://api.walmartlabs.com/v1/search?apiKey=${params.secrets.apiKey}&query=${encodeURIComponent(nameString)}`)
    .then(JSON.parse)
    .then(({items}) => {
      let item = items[0]
      if (item) {
        if (!item.shortDescription)
          item.shortDescription = ""
        return new eba.Result().setData('wmt:Product', item)
      } else {
        return { error: "I haven't found any product" }
      }
    })
    .catch((error) => {
      return { error: `Walmart API error: ${error}` }
    })
}
```

This action is similar to what we have created already. Note that we are using `eba` helpers pacakge to access the value of the `:UserString` via `let nameString = h.get(":UserString")`. We then supply the name and API key to the query string. When returning the results, we take only the first element returned and perform the same data processing as before. We are taking only the first element because this action is meant for returning an object, not a collection. Since it is possible to return multiple items with the same name from this API, we should add an action similar to the one above which can return this collection. We leave this as an exercise to the reader, as it is exactly the same signature but `wmt:Products` is used instead of `wmt:Product` and the data processing step is the same, except that is performed for each element in the collection instead of the first element:

```
items.forEach((item) => {
    if (!item.shortDescription)
        item.shortDescription = ""
})
return new eba.Result().setData('wmt:Products', items);
```

The last action to be programmed is similar to one above, except that it is UPC based search. Instead of searching against a name string, we will be searching against a number.


| Name                          | Signature                                                                 |
| ----------------------------- | ------------------------------------------------------------------------- |
| `wmt:SearchProductByUPC`     | `wmt:Product(optional :UPC(data :Number)) -> data wmt:Product`             |

Rather than a `:WithName` keyword, we expect a `:UPC` keyword as well as a `:Number`. This action will support questions such as `show me product with UPC 123`. The body of this action is similar to the search-by-name action we created before. The only differences is that we unwrap `h.get(':Number')` and we supply a different query string, eg. `http://api.walmartlabs.com/v1/items?apiKey=${params.secrets.apiKey}&upc=${encodeURIComponent(upc)`.

With these actions in place, we have decent coverage for questions which search for trending products and for questions which perform general product searches by name or UPC. On top of these questions, EBA provides you with out-of-the-box support for filtering, sorting, aggregation, etc.

Here is a short list of questions you should be able to ask at this point within the tutorial:

- which products are trending?
- show me top 5 popular products
- show me average price of these
- what is product name for UPC 647627503349?
- show me products named "call of duty"
- show me popular products with positive description
- show me popular products with price less than $50
