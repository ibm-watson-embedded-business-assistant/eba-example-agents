## Graph

EBA conversational history or state is represented as a graph, composed of nodes of links. This view of your conversation may be seen in our [information space](https://eba.ibm.com/assistant#/space). We detail the basic interface associated with this graph below.

### Nodes

Nodes are a tuple with the first element representing the node's ID and the second element is the node itself. A node has the following interface:

- `name`  -- the name of the node
- `seqn`  -- sequence number associated with a node, an integer
- `data`  -- an object encoding data, with the following properties: `{version, type, content, meta, names}`
- `tags`  -- tags associated with a node, a list of strings
- `score` -- the score associated with a node

### Links

Links likewise are a tuple with the first element representing the link's ID and the second element is the link itself. A link has the following interface: 

- `seqn` -- the sequence number associated with a link, an integer
- `source` -- the ID of a source node which links points to
- `target` -- the ID of a target node which a links points to
