## Table

We support a configurable React table component which introduces a number of useful features, e.g. searching, filtering, exporting to `CSV`, column draggability, size control, pagination, etc. This component is quite suitable to be rendered in the content tab when you wish to display many data fields within a single item. It is also suitable for rendering within the chat panel itself in the case that you are only showing a limited subset of data fields, as space is limited in this context. The table component has a similar interface to the [list](./React_Lists.md) component.

To initialize a table component, you may provide the following initialization properties:
- `items` -- a list of records to be displayed*
- `title` -- title heading of the list. We recommend to use h2 as maximum hierarchy level to be in sync with the other agents.
- `columns` -- a list of columns, each describing the display text, field name and an optional render function.*
- `searchKeys` -- a list of field names which should be searchable
- `config` -- a configuration information for each `column`. It controls which columns are visible in an initial state. 
- `configKey` -- the key used to store the current configuration to the users persistent storage. Required when using the config settings. 

> \* mandatory


** Columns **
Note that the column list within the `columns` property are triples in the following order:
- display name
- field name
- (optional) render function (field, row)

The render function has the following signature:

``` javascript
renderFunction = (field, row) ->
	<custom render code>
```
The first argument is always the value of the `field`, the second optional argument `row` contains the complete record which is used to render the current row. 

For example, `["Score", "score", renderDecimal]` will display a column within the table with column name `Score` and it will populate each entry within this column by accessing the data field named `score`. It will render this item by applying the [renderDecimal](./Index.md#native-ui-components) function.

Another coffee script example demonstrates the usage of a custom render function:

``` javascript
["Score", "score", (field) -> 
					if field
						"#{field} %"
]
```
This function checks for `null` first and if `field` is not null it adds ` %` to the `field` value.

** Search Keys **

** Config - Control the visibility of columns **
There is a way to control the amount of columns which are displayed to the user initially using the `config` property. An user can override this config by manually adding (using the `+`-sign at the end the fare right of table header) and removing columns (by clicking on the `x` which is visible by hovering of the table header column). The adding option is only visible if the amount of visible columns is less than the amount of available columns.
 
For each `fieldNames` listed in `columns` property you need to add a `config` entry using the following format:


```
fieldName:
   visible: true
 ```

The following coffee script example uses the above `score` column declaration and hides it behind the scenes.

```
"score":
    visible: false
```

The following full blown example shows the usage of all 5 initialization properties for the Table component.
The original example can be taken from the Weather Agent code.

```
React.createElement Table,
    title: R.h2 null, "Weather alerts"
    items: @props.data
    searchKeys: ["event_desc", "area_name", "st_name", "cntry_cd", "severity"]
    config: 
        area_name: visible: true
        st_name: visible: false
        cntry_name: visible: true
        phenomena: visible: true
        event_desc: visible: true
        certainty: visible: false
        class: visible: false
        severity: visible: true
        expire_time_gmt: visible: false
        response_types: visible: false
        categories: visible: true
        office_name: visible: false
        source: visible: false
        lat: visible: false
        lon: visible: false
    configKey: "ReactComponentName"
    columns: [
        ["Area", "area_name"]
        ["State", "st_name"]
        ["Country", "cntry_name"]
        ["Phenomena", "phenomena"]
        ["Event", "event_desc"]
        ["Certainty", "certainty"]
        ["Class", "class"]
        ["Severity", "severity"]
        ["Expire", "expire_time_gmt", renderDate]
        ["Response", "response_types", (types) -> _(types).map(({response_type:type}) -> type).join(", ")]
        ["Categories", "categories", (xs) -> _(xs).map(({category:x}) -> x).join(", ")]
        ["Office", "office_name"]
        ["Source", "source", (x) -> x.replace(/\./g, ' ')]
        ["Latitude", "lat"]
        ["Longitude", "lon"]
    ]

```
