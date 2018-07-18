### Assets tab

EBA UI is implemented using React.js as the foundation library. Official React.js documentation can be found [here](https://reactjs.org/docs). All data snippents you can see in the conversation, content or graph areas are implemented using correspoding React.js components.

We use auto discovery for data visualization components: give your component a name following the following convention: `<concept namespace>_<concept name><suffix>` where suffix can be one of:

- `Data` – will be used both in conversation area and Knowledge Graph
- `Node` – will be used in Knowledge Graph only
- `Content` – will be used on Content tab and in full screen mode. 

The following properties will be given to your component in `@props`:

- `data` – concept’s data in JSON
- `node` – information space node
- `colors` – d3 ordinal colors you can use as the consistent palette

Under any circumstances UI component **must not modify** data passed through `@props`.

[Lodash](https://lodash.com/) library is widely used for data transformations. Consider it if it fits your needs.
