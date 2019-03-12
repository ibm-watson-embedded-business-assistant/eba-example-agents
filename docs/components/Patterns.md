## Patterns

Patterns are simply natural language text samples annotated with concepts. When the assistant receives a question from the user, it is able to tokenize and parse this input into a tree. By using natural language patterns, it is able to annotate this tree with the appropriate concepts. For example consider the patterns below.

```
show [trending](wmt:Trending) [products](wmt:Products)
```

This pattern tells the system that trending and products tokens correspond to the concepts `wmt:Trending` and `wmt:Products` respectively. From now on, the system will recognize and consider "trending" and "products" appropriately for all further input. Additionally, it is able to capture the syntactic part of speech tree associated with these tokens.

### Best practices

It is best to enter patterns in a way that logically separates concepts. For instance, `show me {product id|:ProductId}` actually annotates two concepts as one, viz. "product" and "id". The better practice is to enter patterns for id and patterns for product separately, since they are actually two different concepts, viz. `[id](wmt:Identifier)` and `[product](wmt:Product)`. In applications with multiple business entities and multiple ways to refer to these entities, you will find yourself entering many unnecessary patterns if you do not separate them appropriately. 

Also note that individual patterns should not be placed within one entry, e.g. `[\#](:IDSign), [id](:IDSign), [no](:IDSign), [no.](:IDSign), [num](:IDSign)` will represent :IDSign as being equivalent to "# id no no. num". Rather, these patterns should be entered individually as a way to create equivalent references to the `:IDSign` concept. 
