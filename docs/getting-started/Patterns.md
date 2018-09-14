## Patterns

We want Watson to map natural language from user questions to the concept language we have just defined in our ontology. Patterns enable this mapping via token annotations. We add the following patterns:

- `show me all {trending|wmt:Trending} {products|wmt:Products}`
- `show {popular|wmt:Trending} products`
- `what is the {description|wmt:Description}, {price|wmt:SalePrice}, and {msrp|wmt:MSRP} for this {product|wmt:Product}?`
- `{what's|:What} {trending now|wmt:TrendingNow}`
- `show me the product name for {upc|:UPC} 123`

The first pattern tells the system that the token 'products', when used in a similar syntatic context, should be annotated with the `wmt:Products` concept. The third pattern does the same for our attribute concepts as well as the product concept. Note that in this tutorial we have added four annotations on a single line in the second entry. It is possible to list each of these annotations as a seperate entry, and, in fact, our posted walmart sample does this; however, the more compact representation above can be another good option. The last two entries supply annotations for our auxillary concepts.

The result of entering these patterns is that whenever the user asks something like 'show me the msrp for this product'. An annotation tree can be created with the appropriate concepts in place. This annotation tree then becomes the starting point for reasoning.
