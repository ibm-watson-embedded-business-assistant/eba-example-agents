## Front End Assets

### Overview
EBA UI is implemented using React.js as the foundation library. Official React.js documentation can be found [here](https://reactjs.org/docs). All data snippets you can see in the conversation, content or graph areas are implemented using corresponding React.js components.

We use auto discovery for data visualization components: give your component a name following the following convention: `<concept namespace>_<concept name><suffix>` where suffix can be one of:

- `Data` – will be used both in conversation area and Knowledge Graph
- `Node` – will be used in Knowledge Graph only
- `Content` – will be used on Content tab and in full screen mode. 

Note that you likely want to use multiple suffix types for the same concept. For example, if you are rendering data for weather, you will likely want to show this both within the chat panel as well as the content panel. A concise, largely textual representation of the weather can be provided within `weather_WeatherData`, while a larger, graphical representation will be provided within `weather_WeatherContent`. 

The following properties will be given to your component in `@props`:

- `data` – concept’s data in JSON
- `node` – information space node
- `colors` – d3 ordinal colors you can use as the consistent palette

Under any circumstances UI component **must not modify** data passed through `@props`.

As a cautionary note, it is important to understand that the UI components of all agents are gathered and run in the same browser environment. Consequently, we encourage developers to employ the appropriate namespacing for their components and to implement their assets strictly to visualize their own data. The rule here is that developers should respect other components and styles within the system so as to prevent any interference.

### Render Environment
The following packages are available out of the box for front-end assets and can be used within your front end asset codes.

#### CSS packages
- [x1-ui-bootstrap](https://eba.ibm.com/assistant#/lab/glyphicons) - ported bootstrap using IBM styling
- [jquery-ui](https://jqueryui.com/) - jquery UI CSS

#### Javascript packages

Core
- [react](https://reactjs.org/) - the main UI Framework used for EBA
- [react dom](https://reactjs.org/docs/react-dom.html) - top level DOM specific methods
- [react dom server](https://reactjs.org/docs/react-dom-server.html) - enables us to render components to static markup

Util
- [jquery](https://jquery.com/) - JavaScript utility library for handling DOM, ajax, etc. 
- [jquery-ui](https://jqueryui.com/) - UI speicific features built on top of JQuery
- [lodash](https://lodash.com/) -  A modern JavaScript utility library delivering modularity, performance & extras.

Internationalization
- [moment-with-locales](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
- [globalize.js](https://github.com/globalizejs/globalize) - A JavaScript library for internationalization and localization that leverage the official Unicode CLDR JSON data.
- [cldr.js](https://github.com/rxaviers/cldrjs) - provides a simple layer to facilitate i18n software to access and use the official CLDR JSON data. 

Graphs, charts, editors, and more
- [one-color](https://github.com/One-com/one-color) - JavaScript color calculation toolkit for node.js and the browser.
- [ace editor](https://ace.c9.io/) - The High Performance Code Editor for the Web
- [plotly](https://plot.ly/javascript/) - Open Source Graphing Library
- [webcola](https://ialab.it.monash.edu/webcola/) - Constraint-Based Layout in the Browser
- [d3](https://d3js.org/) - Data-Driven Documents
- [dc.js](https://dc-js.github.io/dc.js/) - Dimensional Charting JavaScript Library
- [crossfilter](http://square.github.io/crossfilter/) - Crossfilter is a JavaScript library for exploring large multivariate datasets in the browser.
- [FileSaver](https://github.com/eligrey/FileSaver.js/) - a HTML5 saveAs() FileSaver implementation
- [Leaflet](https://leafletjs.com/) - an open-source JavaScript library
for mobile-friendly interactive maps

### Global Functions and Objects

#### Global Functions

EBA provides global functions for rendering primitive data types which are available for frontend assets. A subset of common used functions are listed here:
 - `renderText(field)` -- used to render long string values in a way that is suitable for table columns; globally replaces `_` with `_\u200b`
 - `renderBoolean(field)` -- renders the boolean value based on the user's locale, e.g. with `locale: de_DE` => `renderBoolean(true)` => `'wahr'`
 - `renderDecimal(field)` -- renders the number value based on the user's locale, e.g. `locale: de` => `renderDecimal(17.34)` => `'17,34'`
 - `renderPercent(field)` -- renders the percent value based on the user's locale, e.g. `locale: de` => `renderPercent(34.4)` => `'34,4%'`
 - `renderCurrency(field, currency='USD')` -- renders the currency value based on the user's locale, e.g. `locale: de` => `renderCurrency(17.34, 'EUR')` => `'17,34 EUR'`
 - `renderDate(field)` -- renders the date value based on the user's locale, e.g. `locale: fr` => `renderDate(1549369035)` => `'5 février 2019'`.
 - `renderDuration(field)` -- renders the duration value based on the user's locale (time units are pretty well standardized), e.g. `locale: fr` => `renderDuration(0.12)` => `'120 ms'`

Note: `renderDate` can work with Javascript Dates, Numbers, and Strings and, in the case the input is a number, we expect its value to be in terms of seconds.
Note: Locale is taken from browser, and defaults to `en-us`.

#### Global Objects

EBA provides a set of global objects which are available for frontend assets.

 - `bridge` object enables communication between EBA frotend and backend. Most commonly this module is used to generate a question to the backend from an event handler on the client side.
    - `.trigger('ask', question)` -- triggers an event to ask EBA a question,   
    e.g. `bridge.trigger('ask', 'Tell me a joke')` will execute the question `Tell me a joke` in the EBA reasoning pipeline.
    - `.trigger('showDetails', detailsObject)` -- triggers an event which passes data from Data component to Content components. This is useful in cases where the Content components is meant to show the details of a single data item which is selected from the content view (such behavior can be viewed by our Docs agent), e.g. `bridge.trigger "showDetails", {id: @props.id, node: @props.node, data: @props.data, item: item}` executed from the Data component will enable the Content component to show details for `item`.
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
 - [Plotly](./frontend/React_Plotly.md)

### Message formatting

EBA provides a few convenience mechanisms for formatting NL messages:
 - [Markdown syntax](./frontend/Markdown.md)
 - [Form fields](./frontend/FormFields.md)
 - [Action buttons](./frontend/ActionButtons.md) 
 
### Multi-modal UI support

- [focused multi-modal UI](./frontend/FocusedUI.md)
