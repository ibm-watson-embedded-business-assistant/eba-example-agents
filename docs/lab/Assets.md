## Assets tab

The assets tab within EBA provides developers a mechanism to create reusable code which can be leveraged across all actions as well as to implement client side renderers for their data. Consequently, we support two types of assets within the dev lab, viz. backend assets and frontend assets.

### Backend assets

It is common in the course of building an agent that certain routines and api calls will be repeated across different actions. In an effort to prevent duplication and promote more modular code, EBA allows developers to create backend assets which can be imported as modules within an action. These assets should export a set of functions and objects which are intended to be reused. Likewise, these assets can import any modules loaded in their particular envionrment, e.g. an http request client. In the case of javascript, these assets are bundled together at runtime and can be imported as local files. For instance, consider a backend asset named 'api-client.js' containing the following code:

```
const rp = require('request-promise-native')

const getEntities = (entity, secrets) => {
   // construct some api options
   const data = await rp(someApiOptions)
   return data
}

module.exports.getEntities = getEntities
```

This module imports the 'request-promise-native' module which is provided OOB by Openwhisk for the Node.js runtime. It then 
exports a module called `getEntities`, which can be reused across our actions for different entities, e.g. sales orders, shipments, etc. Within a semantic action, we can import and use this exposed functionality.

```
const eba    = require('eba')
const client = require('./api-client.js')

module.exports.main = async (params) => {
   // some code ...
   const entities = await client.getEntities('shipments', params.secrets)
   // some code...
}
```

### Frontend assets

EBA enables data visualizations directly within agents. As each agent can introduce its own conceptual domain understanding and produce data for its particular ontology, it can likewise visual its own data. Custom visualization components and styles can be added by developers within our development lab to render their data in any way they choose to. These are added under the 'Assets' tab within the dev lab and denoted as 'frontend' assets. We support jsx, javascript, coffeescript, css, sccs, sass files as frontend assets. Live examples of such assets can be viewed from shared agents, e.g. the Weather agent. Below we detail the environment provided to agent developers on the client side.

For full details on data visualizations please consult our [frontend docs](./assets/Frontend.md)
