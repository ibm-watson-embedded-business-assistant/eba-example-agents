## Patterns tab

This tab is responsible for managing patterns.

### Patterns

A pattern effectively contains an annotated question that you would like your assistant to answer. Annotations are delineated following the format `{token|concept}`. For example, "show me {status|:Status} of these {sales orders|:Orders}" is one pattern entry. This pattern conveys a number of things to your assistant. First, it tells the assistant that the tokens "status" and "sales order" may be considered to refer to :Status and :Orders concepts respectively, which is useful in the course of natural language understanding. Additionally, it provides a sequence of tokens which influence the reasoning engine's scoring metrics. Because we have supplied a direct annotation {sales order|:Order}, the system will favor this interpretation to other competing interpretations, e.g. {sales|:Sales} {order|:Order}. 

Concepts are color coded within the lab to help assistant readablity.

[Learn more about patterns](../components/Patterns.md)
