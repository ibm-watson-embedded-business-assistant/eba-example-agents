## Core concepts

EBA is an ecosystem of domain specific agents. In order to encapsulate and expose common functionality across our system, EBA contains a set of prebuiilt native agents. These agents, like any other agents, implement a set of concepts which can be utilized and extended by other agents within the ecosystem. In this article, we aim to highlight the key set of concepts which developers may want to familarize themselves with in order to better understand the generic functionalities they have available. The catalog below is not meant to be exhaustive, and, as with all our agents, you can view their further details within our dev lab at eba.ibm.com.

### System interface 

Concepts which represent a high level interface for capturing the role of your concept, e.g. a textual message or a showable data element.

- `:Message` -- any subclass will be treated as type of message where underlying textual data is propagated as a response to the user. These concepts will be treated as directives to interact with the user rather than as composable data elements. This is particularly useful in cases where you want to interact with the user but not return any associated data, e.g. `ns:DeleteProduct subClass :Message` can enable the textual response 'I have deleted your product named abc' when `data ns:DeleteProduct` is produced.

- `:Showable` -- any subclass will be treated as a showable entity. This entity can be visualized using our standard assets and displayed to the user in our chat, graph, and content views. If a entity is not `:Showable`, then it will not recieve a high score when used in conjunction with `:ActionShow`. 

### Actions

All action concepts are a subclass of `:Message` as they reprsent operations by the machine which require user interaction, e.g. show data elements or remove data elements will produce the appropriate message to the user. The following concepts are analogous to CRUD operations, all which are supported by our system.

- `:ActionCreate` -- concept which represents a user's request to have data created. It will create data and post a message to the user.

- `:ActionShow` -- concept which represents an user's request to have data shown. It will produce `:Showable` data. 

- `:ActionModify` -- concept which represents a user's request to have data updated. It will modify data and post a message to the user. 

- `:ActionDelete` -- concept which represents a user's request to have data removed. It will remove data and produce a textual response to the user.

### Basic data entities

These concepts represent the basic types of data which our system provides OOB.

- `:UserString` -- underlying data within quoted strings.
- `:Number`     -- a numeric value.
- `:Timeframe`  -- a timeframe element containing information such as the start and end of the timeframe as well as its level of grainularity.
- `:FreeText`   -- textual input form user's question which is not consumed by any other actions within a particular variant. This concept can be useful in cases where more free-formed input is expected.

### Conditions

- `:Contains`    -- condition which signifies that source value contains target value.
- `:StartsWith`  -- condition which signifies that source value starts with target value.
- `:EndsWith`    -- condition which signifies that source value ends with target value.
- `:Like`        -- condition which signifies that source value matches target value in a fuzzy search.
- `:GreaterThan` -- condition which signifies that source value is greater than target value.
- `:LessThan`    -- condition which signifies that source value is less than target value.
- `:Equivalent`  -- condition which signifies that source value is strictly equal to the target value.

### Aggregation

These concepts represent aggregration and modifier operations on top of collections. Typically these concepts will be used in conjunction with certain predicates and collections, e.g. `:SortedBy(:Quantity, :SalesOrders)`.

- `:TopN`      -- gets the top N values within a collection
- `:SortedBy`  -- sorts a collection by a criteria
- `:Filter`    -- filter a collection
- `:First`     -- get the first element in a collection
- `:Largest`   -- get the largest element in a collection
- `:HighValue` -- gets values within a collection within the highest quartile
- `:LowValue`  -- gets values within a collection within the lowest quartile
- `:Average`   -- get the average value across a collection
- `:Total`     -- get the sum total value across a collection
- `:Minimum`   -- get the minimum element within a collection
- `:Maximum`   -- get the maximum element within a collection
- `:MinimumBy` -- get the minimum value by a particular predicate within a colleciton
- `:MaximumBy` -- get the maximum value by a particular predicate within a colleciton

### Qualifiers

These concepts represent certain language qualifiers for designated entities. Often times these qualifiers can be ommitted in natural language, and, consequently, they are often denoted as `optional` when used within semantic actions.

- `:WithName` -- qualifier which references a value as being the name of an entity, e.g. 'show product _named_ iPhone X. 
- `:WithId`   -- qualifier which references a value as being the id of an entity, e.g. 'show product _id_ 123.
- `:Relation` -- qualifier which explictly denotes the relationship between two entities, e.g. show me contacts _in_ this org.
- `:All`      -- qualifier which explictly denotes that all entities should be qualified, e.g. 'show me _all_ sales orders'. 
- `:Own`      -- qualifier which explictly denotes entities belonging to the user, e.g. 'show me _my_ contacts'.

### NLG

These concepts pertain to extending custom NLG capabilties. 

- `nlg:PostModifier` -- denotes that the spelling for a particular concept operates as a post modifier, e.g. 'show me complaints _against_ this product'.
- `nlg:PreModifier` -- denotes that the spelling for a particular concept operates as a pre modifier, e.g. 'show me _late_ sales orders'.
- `nlg:PlainText`   -- used within NLToken interface to denote a plain text entry, where the data supplied to this concept will be spelled as is.
