### Native UI Components

Our team provides users with a few prebuilt and configurable react components that are generic across any application domain. We intend the detail these components and their usage within this document. In particluar, we support [List](#List), [Table](#Table), and [Props](#Props) components. 

#### List

We support an enhanced list component that provides size control, pagniation, searchablity, as well as unified styles with our native application. The list component can be particularly useful for questions that produce large collections of data. A short inline description of each individual data item can be shown along with a link to view, in turn, a detailed summary of the particular item. Our weather agent provides a good example of this. Ask Watson "show me weather alerts in 94404". Each alert is displayed as a list item which contains a brief description of the alert along with its geo-location. If you are interested in a particular alert, simply click the link to view an alert summary. You will note that clicking the link actually generated a new question within our conversation. This is because we expose a `bridge.trigger` function within our frontend assets which enables us post new questions to Watson. Lets review the interface for this component as well as an example.

To intialize a list component, you may provide the following intialization properties:
- `items` -- the list of data items to be rendered
- `searchKeys` -- the keys, i.e. the data fields, which are searchable for a given item
- `title` -- title heading of the list
- `numbered` -- boolean whether or not the list is numbered
- rendering function -- either `render` or `renderList`

Note that we provide two options for rendering the list--rendering item-by-item or rendering the entire list at once. Accordingly, the `render` function will recieve as input an individual data item, while `renderList` will recieve the entire list as well as the search component.

```
React.createElement List,
    items: _.filter @props.data, ({severity}) => @state.severities[severity].checked
    searchKeys: ["event_desc", "area_name", "st_name", "cntry_cd", "severity"]
    renderList: (items, search) =>
        search
        R.h2 null, "Weather alerts"
        R.div className:"cca-weather-alerts-severities",
            # code for rendering severities selection panel
        R.ul style:margin:0,
            _.map items, (item) =>
                R.li
                    key: item.key
                    R.span null,
                        R.a
                            href: "#"
                            onClick: (e) =>
                                e.preventDefault()
                                bridge.trigger "ask", "tell me more about weather alert #{item.key}"
                            item.event_desc
                        " in "
                        item.area_name
                        ", "
                        item.st_name || item.cntry_cd
```

We see first that we are supplying only those items whose severity level is marked, using `_.filter`. Furhtermore, we see that certain data fields of the alerts themselves are searchable within this component, e.g. event description. In this case, we are choosing the render the entire list at once. This is because we plan to render some other components before rendering the list, e.g. the search component, a header, and a severity selection panel. After words, we use a `_.map` to print the list items programatically. Lastly, observe that we attached a click handler which utilizes our `bridge.trigger` function.


#### Table

We support a configurable table component which introduces a number of useful features, e.g. searching, filtering, exporting to csv, column draggability, size control, pagination, etc. This component is quite suitable to be rendered in the content tab when you wish to display many data fields within a single item. It is also suitable for rendering within the chat panel itself in the case that you are only showing a limited subset of data fields, as space is limited in this context. The table component has a similar interface to the list component.

To intialize a list component, you may provide the following intialization properties:
- `items` -- the list of data items to be rendered
- `searchKeys` -- the keys, i.e. the data fields, which are searchable for a given item
- `title` -- title heading of the list
- `columns` -- list of lists, detailing which data fields of the items you wish to render.

Note that columns lists within the `columns` property are triples on the order of [title, fieldName, (optional) rendering funciton]. For example, ["Score", "score", renderDecimal] will display a column within the table with title 'Score' and it will populate each entry within this column by accessing the data field named `score`. It will render this item by applying the renderDecimal runction. Rendering functions are optional.

If we were to construct a tabular view of weather alerts, it might look something like the following:

```
React.createElement Table,
    title: R.h2 null, "Weather lets"
    items: @props.data
    searchKeys: ["event_desc", "area_name", "st_name", "cntry_cd", "severity"]
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


#### Props

We also introduce a Props component, which is provides users with a convient mechanism for displaying each property of a particular data item. In fact, when you inspect a single weather alert via the click handler described in the List component, you will see the individual weather alert displayed using the Props component. It provides a detailed summary of the alert itself. 

The interface for instantiating a Props component is detailed below.
- `data` -- the single data item being rendered
- `style` -- display style, either plain, dash, or table
- `props` -- list of lists, detailing which title and properties to use (similar to Table)

Note that setting style to table creates a tabular reprsentation for the data item. Note that Table is used for collections, while Props can provide a tabular view for a single item.

Here is the Props component for a given weather alert. You can note that this interface follows similar conventions to those already detailed above.

```
React.createElement Props,
    data: @props.data.alertDetails
    style: "plain"
    props: [
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