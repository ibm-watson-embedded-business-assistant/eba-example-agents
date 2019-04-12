## Superclass rendering pipeline

We are excited to announce a new change to EBA's rendering pipeline--superclass evaluation. This superclass evaluation provides a mechanism for visualizing concepts using a hierarchical priority system, giving developers more power in the selection of UI visualizers.

Since EBA concepts are well formed and often contain subclass ontology relationships, we have decided to leverage this existing knowledge to provide a priority system when deciding which React component to use in visualizing a particular concept. This priority system is based on a _superclass_ hierarchy of the target concept. A superclass here denotes the hierarchy of concepts which a particular concept derives from, including the concept itself. The superclass is represented as an ordered list. For instance, if `:SalesOrder` subClasses from `:Order` and `:Showable`, the superclass produced is [`:SalesOrder`, `:Order`, `:Showable`]. From here our system determines which React component to invoke. It will first look for the component for `:SalesOrder`. If the component does not exist, then it will look for `:Order`, and, so on. This opens the door to customize and alter existing visualization pipelines. For instance, you can render all types of orders using a single component, or you can assert priority to a given visualization. 

### Some use cases to consider

Since EBA is a collaborative system, and, furthermore, different offerings may provide custom integrations for particular clients, it becomes important to offer flexibility in the selection of visualizers. Consider a case where there is a core or foundational agent called CoreAgent and, within the same ecosystem, there is also a custom agent built as an extension of top of this called ExtensionAgent. ExtensionAgent would like to reuse the functionality from CoreAgent, but to provide a different visualization as it presents data to its users. In this case, CoreAgent can define the following semantic ontology and visualizer:

```
## ontology
:CoreEntity subClass :CoreEntityViz


## React component
class CoreEntityVizData extends PureComponent
  ...
```

Within ExtensionAgent, we can simply assert priority by defining the visualizer for `:CoreEntity`: 

```
## React component
class CoreEntityData extends PureComponent
 ...
```

From now on, whenever `:CoreEntity` is used within the context of ExtensionAgent, the ExtensionAgent can provide the desired custom presentation.


Another scenario is to consider a custom data type, such as a percent value associated with your data, e.g. open rate for a mailing. Traditionally, `:OpenRate` is a numerical attribute which subclasses from `:NumAttribute`. However, in its native implementation, the visualizer associated with `:NumAttribute` simply renders the value as is. You may wish to render this value in a custom way, e.g. with a percentage sign. This attribute and all like attributes can subclass from, say, `:PercentegeValue`. You can now render these objects in a custom fashion.
