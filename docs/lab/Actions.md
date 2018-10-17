## Actions tab

This tab is responsbilie for managing your action signature defintions as well as the IBM cloud functions executors.

### Naming

Naming for actions follow a similar format as naming for concepts, viz. `domain:action`. The same domain should be used for both concepts and actions. Action should be descriptive of what the action does. For instance, `sc:GetSalesOrdersById` denotes the action GetSalesOrderById for the sc (Supply Chain) domain.

### Signature

Watson Assistant is able to reason about actions provided by their signature. The signature can be thought of as a map of inputs to outputs while providing some optional constraints on these parameters. The format used for action signatures are the following, viz. `constraints => input -> output`. Watson Assistant is powered by Haskell, and this paradigm for defining actions will be familar to Haskell developers.

### Constraints

Click the constraints tab to enter a constraint. A constraint is also represented in the RDF format already mentioned, viz. subject predicate object. They serve as a way to provide generalism to our actions. Consider the following constraints: `a subClassOf :Lists` This constraint binds the parameter `a` to be any subclass of :Lists. This means that our action will be able to work generically with any type of list, e.g.  :ContactLists, :Orders, :Supplies. Note that the developer must provide appropriate entries in the ontology in order for the action to work properly, e.g. `:ContactList subClassOf :List`. The constraint parameter `a` can now be referenced in the input and output specifications.

### Input

Click the input tab to enter an input definition. Input should be defined as a tree of concepts reflectin the sentence structure of expected user questions. 

### Output

Click the output tab to enter an output definition. Output should be defined as a list of concepts. It is almost always represented as a single concept qualified by its [paramtype](../components/Actions.md#ParamType).

### Protocol

Semantic actions or actions within EBA are a means for creating data nodes associated with various concepts. In order to produce data nodes, our actions define an executor function which is run inside of IBM Cloud FaaS. This is the place where we perform the api requests, data processing, and other functionalities necessary to produce real data for our conversations. We follow a standard protocol when communicating with IBM FaaS which requires us to follow a standard format for the input and output of our executing functions. Additionally, you should be aware of certain [system limits](https://console.bluemix.net/docs/openwhisk/openwhisk_reference.html#openwhisk_syslimits) imposed by IBM Cloud FaaS iteslf. Note that for some language enviornments we have provided convenient [helper interfaces](#helpers) which abstract this protocol accordingly. These helpers may even contain mechanisms to avoid certain system limits, e.g. result size.

Action input will be supplied as follows within the __main__ function of the executor:

- `secrets` -- object containing secrets
- `agent` -- string containing agent name
- `token` -- user specific auth token
- `storage` -- object containing user specific remote storage
- `apiurl` -- api url for EBA,
- `input` -- object containing nodes specified in action input, where concept name is key and node is value
- `settings` -- object containing settings

Action output should be supplied as follows within the __main__ function of the executor:

- `output` -- object containing the data associated with the output concept
- `storage` -- object containing the key, value pairs to be persisted in remote storage

An example of input for the input signature: `:Item(data :Number)`:
```
    {
        ":Number": {
            "name": ":Number",
            "tags": [
                "data:MakeDucklingNumber"
            ],
            "data": 123,
            "meta": {
                "data": 123,
                "name": ":Number",
                "prop": [],
                "text": "123."
            },
            "type": "data"
        },
        "@question": {
            "name": "question",
            "tags": [
                "repr"
            ],
            "data": "show me item 123",
            "meta": null,
            "type": ""
        },
        ":Item": {
            "name": "ex:Item",
            "tags": [
                "item"
            ],
            "data": [
                {
                    "synonyms": [
                        "detail",
                        "particular",
                        "point",
                        "token"
                    ],
                    "cpostag": "NOUN",
                    "lemma": "item",
                    "postag": "NN",
                    "id": 3,
                    "deprel": "dobj",
                    "length": 4,
                    "form": "item",
                    "start": 8
                }
            ],
            "meta": null,
            "type": "concept"
        }
    }
```

An example of output for the output signature: `data :Item`:
```
    {
        "output": {
            ":Item": {
                "data": "item-data"
            }
        },
        "storage": {
            "hello": "world"
        }
    }
```

You are welcome to reference the javascript source code implementation of the [helpers module](../../samples/agent-runtime-nodejs/eba.js) which abstracts this protocol. You will find that our sample agents make use of the interfaces exported from this module.

### Modules

Actions within Watson Assistant can make use of a variety of pre-installed modules: [node modules](./NodeModules.md)

### Helpers

Watson Assistant also provides developers with a utility pacakge for working with its own components: [node helpers](./NodeHelpers.md)


[Learn more about actions](../components/Actions.md)
