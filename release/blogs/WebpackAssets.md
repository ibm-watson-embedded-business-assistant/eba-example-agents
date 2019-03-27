## Webpack assets

To ease the life of developers who are implementing the client side presentation of their data, we have introduced support of bundled Javascript modules using Webpack. Before the release of this feature, there were, adimittedly, some pain points with developing frontend assets, particularly as it pertains to sharing and loading dependent components. With this feature, EBA provides the following benefits to developers:
* Frontend code is transpiled, bundled and minified
* Users can share code across components
* There is no dependency on loading order anymore
* Frontend assets will be safely unloaded on agent change or deactivation
* There will be no pollution of a global scope with custom components
* 3rd party libraries will be isolated in agent bundles

To enable Webpack bundling, we only require to two steps to be followed:

First, within the 'General' tab, click the checkbox next to 'Use webpack to bundle frontend assets.

[![Webpack checkbox](../webpack-checkbox.png "Task management")](../webpack-checkbox.png)

Secondly, `export` your components programtically.

[![Webpack export](../webpack-export.png "Webpack Export")](../webpack-export.png)
