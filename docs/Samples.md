## Example Agents

Our team has provided some samples of various agents. 

These agents were developed completely within our lab tools. The samples should contain the actual yaml configuration of each agent which you can inspect and load into your own sandbox, as well as development notes to help you understand the various features available to you.

[Walmart trends](../samples/Walmart.md) - gets trending products from Walmart.  
*topics:* external api, settings configuration, UI assets, collaborative reasoning.

[Riddles](../samples/Riddles.md) - take over agent for asking riddles.  
*topics:* crafted dialog messages, session storage, reasoning take over, custom annotations.

[Wikipedia](../samples/Wikipedia.md) - fallback style agent which searches Wikipedia for relevant article if no other agent handled user question.  
*topics:* fallback style agent, @fallback endpoint, user input cleaning.

[Watson Discovery](../samples/WatsonDiscovery.md) - fallback style agent which searches Watson Discovery collections for relevant articles.
*topics:* fallback style agent, @fallback endpoint, frontend visualizations

[EDI sample](../samples/EDI.md) - models inspection operations and a small submission process for objects within the Electronic Data Interchange.  
*topics:* attribute support, data modifiers, user storage using eba api, @start endpoint, basic process management.

[Supply chain insights](../samples/SupplyChain.md) - provides an agent interface for working with supply orders and sales orders.  
*topics:* lazy data api, @force endpoint, multiple attribute types, backend assets, complex action signatures.

[Quest example](../samples/Quest.md) - provides Natural Language Interface to Databases by creating SQL queries from natural language questions. 
*topics:* structured data, database schema, SQL queries.
