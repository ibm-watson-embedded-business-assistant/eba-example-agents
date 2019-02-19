## Props

We also introduce a Props component, which is provides users with a convenient mechanism for displaying each property of a particular data item. In fact, when you inspect a single weather alert via the click handler described in the List component, you will see the individual weather alert displayed using the Props component. It provides a detailed summary of the alert itself. 

The interface for instantiating a Props component is detailed below.
- `data` -- the single data item being rendered
- `style` -- display style, either plain, dash, or table
- `props` -- list of lists, detailing which title and properties to use (similar to Table)

Note that setting style to table creates a tabular representation for the data item. Note that Table is used for collections, while Props can provide a tabular view for a single item.

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
