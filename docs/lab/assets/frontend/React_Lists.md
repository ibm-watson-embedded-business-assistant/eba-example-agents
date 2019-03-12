## List

We support an enhanced list component that provides size control, pagination, searchability, as well as unified styles with our native application. The list component can be particularly useful for questions that produce large collections of data. A short in-line description of each individual data item can be shown along with a link to view, in turn, a detailed summary of the particular item. Our weather agent provides a good example of this. Ask Watson "show me weather alerts in 94404". Each alert is displayed as a list item which contains a brief description of the alert along with its geo-location. If you are interested in a particular alert, simply click the link to view an alert summary. You will note that clicking the link actually generated a new question within our conversation. This is because we expose a `bridge.trigger` function within our front end assets which enables us post new questions to Watson. Lets review the interface for this component as well as an example.

To initialize a list component, you may provide the following initialization properties:
- `items` -- the list of data items to be rendered
- `searchKeys` -- the keys, i.e. the data fields, which are searchable for a given item
- `title` -- title heading of the list
- `numbered` -- boolean whether or not the list is numbered
- rendering function -- either `render` or `renderList`

Note that we provide two options for rendering the list--rendering item-by-item or rendering the entire list at once. Accordingly, the `render` function will receive as input an individual data item, while `renderList` will receive the entire list as well as the search component.

```
React.createElement List,
    items: _.filter @props.data, ({severity}) => @state.severities[severity].checked
    searchKeys: ["event_desc", "area_name", "st_name", "cntry_cd", "severity"]
    renderList: (items, search) ->
        search
        R.h2 null, "Weather alerts"
        R.ul style:margin:0,
            _.map items, (item) ->
                R.li
                    key: item.key
                    R.span null,
                        R.a
                            href: "#"
                            onClick: (e) ->
                                e.preventDefault()
                                bridge.trigger "ask", "tell me more about weather alert #{item.key}"
                            item.event_desc
                        " in "
                        item.area_name
                        ", "
                        item.st_name || item.cntry_cd
```

We see first that we are supplying only those items whose severity level is marked, using `_.filter`. Furthermore, we see that certain data fields of the alerts themselves are searchable within this component, e.g. event description. In this case, we are choosing the render the entire list at once. This is because we plan to render some other components before rendering the list, e.g. the search component, a header, and a severity selection panel. After words, we use a `_.map` to print the list items programmatically. Lastly, observe that we attached a click handler which utilizes our `bridge.trigger` function.
