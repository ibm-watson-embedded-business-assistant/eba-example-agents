### Multi-modal focused UI elements

As EBA supports multi-modal UI components, it is important to develop your assets in a manner which can leverage this capability. This capability must be enabled by every UI component which intends to leverage this capability. To enable to this capability, there are a few requirements:

- The element must contain the class `cca-focusable` to indicate that it is a focusable element
- The element must contain the class `cca-focused` when the element is actually brought into focus. To determine if an element is focused element provides a object called `focus` which is attached to the component's `props`. This object contains a field called `item` which signifies the element which is selected on the screen. This value can be checked against the element's  own identifier.

Below is an example, in coffeescript, of how we might support this feature for product component.

```
class demo_ProductData extends PureComponent
  render: ->
    item = @props.data
    itemKey = item.id
    
    R.div
      "data-item": itemKey
      className: classNames
        "demo-product": true
        "cca-focusable": true
        "cca-focused": @props.focus?.item == itemKey
      R.div className: "demo-product-info", ...

```

For built-in UI components, such as Table and List, this interface is further simplified, as it may suffice just to specify the name of the key itself as `itemKey` or `data-item-key` property. Here is an example for a Table component and List component.

```
class demo_MerchantsData extends PureComponent
  render: ->
    React.createElement Table,
      items: @props.data
      focus: @props.focus
      title: R.h2 null, "Merchants"
      searchKeys: ["name"]
      itemKey: "name"
      columns: [ ... ]
```

```
class demo_ProductsData extends PureComponent
  render: ->
    React.createElement List,
      items: @props.data
      focus: @props.focus
      renderList: (items, search) =>
        R.div className:"form-group",
          search
          R.h2 null, "Products"
          R.div "data-item-key": "id", items.map (item, idx) =>
            React.createElement demo_ProductData,
              key: idx
              data: item
              focus: @props.focus
```
