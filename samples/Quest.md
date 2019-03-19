This agent allows the user to query structured data from a relational database using natural language by converting natural language questions to SQL queries (or other structured languages). Aside from relational databases, Quest supports multiple data sources, e.g. HIVE, Salesforce.com and others.

A semantic model of the database schema should be created during the training time. The model specifies the tables, columns, and their relations and is used by QUEST to process the natural language questions and produce SQL queries. 
The sample schema represents a Sales/Warehouse database with 8 tables. This schema is used with a sample Quest agent. The example questions demonstrate what can be asked of this schema.

 ![Warehouse schema](./images/warehouseSchema.png)

To try this sample, please load the yaml configuration into your own sandbox environment.
