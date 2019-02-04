## Ontology

Beginning with a completely empty configuration, we decide that our domain is mostly about one thing--products from Walmart. We want our assistant to understand products, so we begin by adding the following entries into our ontology tab.

| Name           | Spelling          | SubClass of         | List of       |
| -------------- | ----------------- | ------------------- | ------------- |
| `wmt:Product`  | `product`         | `:Showable`         |               |
| `wmt:Products` | `products|*`      | `:Showable`         | `wmt:Product` |

We have just provided the following information to our system. We can recognize two concepts, viz. `wmt:Product` and `wmt:Products`. Each of these concepts have an appropriate spelling which will be used in natural language generation (NLG). NLG enables Watson to compose appropriate responses to the user in the same terms as the original questions. For example, when asking for product 123, Watson may reply 'I have found the following **product** with id 123'. This helps to eliminate hard coded responses. Furthermore, each of these concepts is a subclass of `:Showable` meaning that the data associated with these concepts can actually be shown to user within the chat panel. Lastly, we have specified that products is a list of individual product elements, which helps to enable useful operations on the collection such as filtering, sorting, etc.


 We want `wmt:Product` to correspond to our real data model coming from the Walmart Api. Now Walmart's open api will return something on the order of `{ name: 'some name', msrp: 'some msrp', shortDescription: 'some description', 'salePrice': 'some price' ... }`, so we will want to map these json field names to actual concepts within our systems. They will serve as attributes for `wmt:Product`. This enables Watson Assistant to understand `wmt:Product` in terms of its component attributes.

| Attribute         | JSON Field        |
| ----------------- | ----------------- |
| `:Name`           | `name`            |
| `wmt:MSRP`        | `msrp`            |
| `wmt:SalePrice`   | `salePrice`       |
| `wmt:Description` | `shortDescription`|

In order to enable full attribute support, we need to specify some additional information in the ontology. In short, we should tell the system these concepts are in fact attributes along with their corresponding spelling. We add the following entries.

| Name              | Spelling      | Subclass of                      | 
| ----------------- | ------------- | -------------------------------- |
| `wmt:MSRP`        | `msrp`        | `:Attribute`, `:NumAttribute`    |
| `wmt:SalePrice`   | `sale price`  | `:Attribute`, `:NumAttribute`    | 
| `wmt:Description` | `description` | `:Attribute`, `:NumAttribute`    | 

By making a concept subclass from `:Attribute` we tell the system that it is an attribute. This system will then generate certain actions in the back end to enable attribute queries such as `show me the msrp of this product`. We additionally specify that type of the attribute, i.e. whether it is a string, number, or date attribute, which helps enable filtering questions such 'show me products with msrp below 100'. 
Lastly, they each contain an appropriate spelling for NLG. Note that we did not enter any data for `:Name`. This concept is already natively supported by our system, hence the lack of domain prefix. Note that attributes are treated as `:Showable` for our system, so it is redundant to add this subclass entry.

As mentioned in the introduction, we will want to iteratively test each new piece of knowledge that we add to our system. Since this sample is small enough we can add two more auxiliary nodes to cover all relevant types of questions. Lets add entries for `:UPC`, `wmt:Trending`, `wmt:TrendingNow`.

| Name              | Spelling      | 
| ----------------- | ------------- |
| `:UPC`            | `UPC`         |
| `wmt:Trending`    |               |
| `wmt:TrendingNow` |               |

It is now a good time to add patterns, actions, and visualization to support questions related to products.