## Front End Assets

For frontend assets different code styles can be used. In the following sections we will describe how the rendering environment will look like and what functions and modules are provided by the EBA team. 

### Render Environment
The following packages are available out of the box for front-end assets and can be used within your front end asset codes.

##### CSS based frontend assets
- [x1-ui-bootstrap](https://eba.ibm.com/assistant#/lab/glyphicons) - a set of available icons
- [jquery-ui](https://jqueryui.com/)

##### Javascript based frontend assets

**Core**
- [react](https://reactjs.org/) - the main UI Framework used for EBA
- react dom
- react dom server
- [jquery](https://jquery.com/)
- [jquery-ui](https://jqueryui.com/)

**Tools**
- [lodash](https://lodash.com/) -  A modern JavaScript utility library delivering modularity, performance & extras.
- [one-color](https://github.com/One-com/one-color) - JavaScript color calculation toolkit for node.js and the browser.
- [FileSaver](https://github.com/eligrey/FileSaver.js/) - a HTML5 saveAs() FileSaver implementation
- [ace editor](https://ace.c9.io/) - The High Performance Code Editor for the Web
- 
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
 - `renderDecimal(field)` -- renders the number value based on the user's locale, e.g. `locale: de_DE` => `renderDecimal(17.34)` => `'17,34'`
 - `renderPercent(field)` -- renders the percent value based on the user's locale, e.g. `locale: de_DE` => `renderPercent(0.344)` => `'34,4%'`
 - `renderCurrency(field)` -- renders the currency value based on the user's locale, e.g. `locale: de_DE` => `renderCurrency(17.34)` => `'17.34 EUR'`
 - `renderDate(field)` -- renders the date value based on the user's locale, e.g. `locale: fr_FR` => `renderDate(1549369035501)` => `'5 février 2019'`
 - `renderDuration(field)` -- renders the duration value based on the user's locale. TODO @kevingrozav: Example for duration???

Check out a more detailed description on [i18n support](./../I18N.md).

##### Global Objects

EBA provides a set of global objects which are available for frontend assets.

 - `bridge` TODO @kevingrozav. Please provide more details for the bridge object.
    - `.trigger(action, question)` -- triggers an event to ask Watson Assistant a question,   
    e.g. `bridge.trigger('ask', 'Tell me a joke')` will execute the question `Tell me a joke` in the EBA reasoning pipeline.
 - `I18N` module for globalization support. Check out a more detailed description on [i18n support](./../I18N.md).
 - TODO @kevingrozav: do we have others?


### Native UI Components
Our team provides users with a few pre-built and configurable react components that are generic across any application domain. We intend the detail these components and their usage within this document. 

In particular, we support the following components:
 - [List](./frontend/React_Lists.md)
 - [Table](./frontend/React_Tables.md)
 - [Props](./frontend/React_Props.md) 
 
