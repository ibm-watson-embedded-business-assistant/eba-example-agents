## Front End Assets

EBA enables data visualizations directly within agents. As each agent can introduce its own conceptual domain understanding and produce data for its particular ontology. It can likewise visual its own components. Custom React components and styles can be added by developers within our development lab to visualization their data in any way they choose to. These are added under the 'Assets' tab within the dev lab and denoted as 'frontend' assets. We support jsx, javascript, coffeescript, css, sccs, sass files as frontend assets. Live examples of such assets can be viewed from shared agents, e.g. the Weather agent. Below we detail the environment provided to agent developers on the client side.

### Render Environment
The following packages are available out of the box for front-end assets and can be used within your front end asset codes.

##### CSS based frontend assets
- [x1-ui-bootstrap](https://eba.ibm.com/assistant#/lab/glyphicons) - a set of available icons
- [jquery-ui](https://jqueryui.com/)

##### Javascript based frontend assets

**Core**
- [react](https://reactjs.org/) - the main UI Framework used for EBA
- [react dom](https://reactjs.org/docs/react-dom.html) - top level DOM specific methods
- [react dom server](https://reactjs.org/docs/react-dom-server.html) - enables us to render components to static markup
- [jquery](https://jquery.com/) - javascripti utility library for handling DOM, ajax, etc. 
- [jquery-ui](https://jqueryui.com/) - UI speicific features built on top of JQuery

**Tools**
- [lodash](https://lodash.com/) -  A modern JavaScript utility library delivering modularity, performance & extras.
- [one-color](https://github.com/One-com/one-color) - JavaScript color calculation toolkit for node.js and the browser.
- [FileSaver](https://github.com/eligrey/FileSaver.js/) - a HTML5 saveAs() FileSaver implementation
- [ace editor](https://ace.c9.io/) - The High Performance Code Editor for the Web
- [moment-with-locales](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
- [globalize.js](https://github.com/globalizejs/globalize) - A JavaScript library for internationalization and localization that leverage the official Unicode CLDR JSON data.
- [cldr.js](https://github.com/rxaviers/cldrjs) - provides a simple layer to facilitate i18n software to access and use the official CLDR JSON data. 

**Visualization Libraries**
- [plotly](https://plot.ly/javascript/) - Open Source Graphing Library
- [webcola](https://ialab.it.monash.edu/webcola/) - Constraint-Based Layout in the Browser
- [d3](https://d3js.org/) - Data-Driven Documents
- [dc.js](https://dc-js.github.io/dc.js/) - Dimensional Charting Javascript Library
- [crossfilter](http://square.github.io/crossfilter/) - Crossfilter is a JavaScript library for exploring large multivariate datasets in the browser. 

### Global Functions and Objects

##### Global Functions

EBA provides global (render) functions which are available for frontend assets. A subset of common used functions are listed here:
 - `renderText(field)` -- used to render a non-String based value (Number, Date) as text, e.g. `renderText(123)` => `'123.0'` 
 - `renderBoolean(field)` -- renders the boolean value based on the user's locale, e.g. with `locale: de_DE` => `renderBoolean(true)` => `'wahr'`
 - `renderDecimal(field)` -- renders the number value based on the user's locale, e.g. `locale: de` => `renderDecimal(17.34)` => `'17,34'`
 - `renderPercent(field)` -- renders the percent value based on the user's locale, e.g. `locale: de` => `renderPercent(0.344)` => `'34,4%'`
 - `renderCurrency(field)` -- renders the currency value based on the user's locale, e.g. `locale: de` => `renderCurrency(17.34)` => `'17.34 EUR'`
 - `renderDate(field)` -- renders the date value based on the user's locale, e.g. `locale: fr` => `renderDate(1549369035501)` => `'5 février 2019'`
 - `renderDuration(field)` -- renders the duration value based on the user's locale (time units are pretty well standardized), e.g. `locale: fr` => `renderDuration(0.12)` => `'120 ms'`

Check out a more detailed description on [l10n support](./../l10N.md).

##### Global Objects

EBA provides a set of global objects which are available for frontend assets.

 - `bridge` object enables communication between EBA frotend and backend. Most commonly this module is used to generate a question to the backend from an event handler on the client side.
    - `.trigger('ask', question)` -- triggers an event to ask Watson Assistant a question,   
    e.g. `bridge.trigger('ask', 'Tell me a joke')` will execute the question `Tell me a joke` in the EBA reasoning pipeline.
    - `.trigger('showDetails', detailsObject)` -- triggers an event which passes data from Data component to Content components. This is useful in cases where the Content components is meant to show the details of a single data item which is selected from the content view (such behavior can be viewed by our Docs agent), e.g. `bridge.trigger "showDetails", {id: @props.id, node: @props.node, data: @props.data, item: item}` executed from the Data component will enable the Content component to show details for `item`.
 - `L10N` module for globalization support. 
 - `R` global object for creating DOM elements given set of arguments, e.g. `R.p null, "Hello World"` creates `<p>Hello World</p>`.
 - `React` global object used in React library
 - `$` global object used in JQuery
 - `_` global object used in lodash

### Native UI Components
Our team provides users with a few pre-built and configurable react components that are generic across any application domain. We intend the detail these components and their usage within this document. 

In particular, we support the following components:
 - [List](./frontend/React_Lists.md)
 - [Table](./frontend/React_Tables.md)
 - [Props](./frontend/React_Props.md) 
 
