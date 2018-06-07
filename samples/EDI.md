This sample models some basic operations within the [electronic data interchange](https://en.wikipedia.org/wiki/Electronic_data_interchange) or "EDI".

In particular, we support a set of inspection operations for purchase orders as well as a small process for submitting a complete invoice. This sample should provide some insight into a number of areas in Watson Assistant development, e.g. attribute support, data modifiers, user storage via Params api, the start endpoint, as well as a simple action logic for handling a process.

The get the most out of this sample. Please load the [yaml configuration](edi.yaml) into your own sandbox enviornment.

### Dev Notes

#### General

This sample makes use of the endpoints within the General tab. In particular, we implement the @start endpoint, which is used 
to perform some initialization tasks upon session creation. This sample makes use of small persistent storage which Watson Assistant provides to its users. The start endpoint contains some bootstrap logic for populating the storage endpoints "purchaseOrders" and "invoices" for first time users. The Params api, made available in the "eba" pacakge, provides a simple load/save interface for read and modifying data from these endpoints. We check if the load operation returns a 404, meaning that the storage endpoint is empty. If it is empty, we populate some hardcoded sample data in the form of json data, which is located in the assets table.

#### Concepts

We support two concepts which correspond to our business entities, viz. `edi:PurchaseOrders` and `edi:Invoices`. Additionally, we support a wide variety of attributes for inspecting different parts of our purchase orders. You can view the attributes on purchase orders in the attribtues tab. Concepts of particular interest will be `edi:Modify`, `edi:Cancel`, and `edi:Submit`. These concepts derive from :Message, meaning that their primary intent is to notify the user of some operations that involve side effects. In fact, they are created with the intention of representing data modification in the course of our business process. We make these side effects viewable to the user using rewriting rules--discussed below.

#### Patterns

Patterns will be straigtforward for the most part. It is important to note only two details. First, note that we have implemented some granular patterns for certain prepositions: 

`{set|edi:Modify} {transportation mode|edi:TransportationMode} {to|edi:To} "road"`

We label {to|edi:To} to provide some increased confidence to the system. Other agents within the system may provide a different meaning to such tokens, e.g. it may be interpretted as `:RelationTo` and `:With`. More importantly, be advised that we have consolidated certain patterns, e.g. 

`what is the {trailer items count|edi:TrailerCount} and {trailer details|edi:TrailerDetails} and {trailer amount|edi:TrailerAmount} for this {order|edi:PurchaseOrder}`.

This pattern will enable Watson Assistant to perform natural language understanding for these different concepts using just one pattern as an input. However, the assistant may not support answering this exact question. In this particular example, the assistant is not able to reuse the purchase order concept three times.

#### Actions

We have provided some detailed description of action signatures within the configuration itself. The actions are modeled in a straight forward fashion. We support actions for fetching collections or fetching particualr elements by an indentifier, e.g. purchase order number. For data modification actions, you will see that we use the following pattern `dataModifier(context data edi:Invoice)`. We are supporting actions that modify data within the context of the information space. We expect users to input things like "set transporation mode to air", which modifies the invoice already existing within the conversation context. It is important to note that the data modifiers are simply appending attributes onto the existing invoice, e.g. canceling an invoice appends `isCancled:false` to the invoice. In order to persist these changes remotely, we need to actually finish the invoice submission process.The action bodies themselves make use of the Params and Result api to fetch objects from storage and update data to objects within the information space respectively. 

#### Rewriting Rules

In order to show the user the results of our modifications. We following a convention of converting our data modification concepts to be reintrepeting as `:ActionShow`. This has the effect that, after performing modifications to the invoice, the resulting invoice will be shown to the end user after the operation completes. 

#### Assets

We have two types of assets. First we have assets in the form of json, which are used to popualte our storage with syntethic data. Secondly, we have a utility file for performing some basic functionality across multiple actions. 

#### Debug

View the debug log if things go wrong!
