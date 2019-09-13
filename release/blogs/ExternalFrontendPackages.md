## Import third party client side libraries

In the course of developing their agents, EBA developers may need to make use of external libraries which are not provided out of the box by our system. So far the ability to include any third party module was only supported for backend assets. This is now supported for client side modules as well, meaning that developers can leverage existing third party React components in the course of developing their data visualizations. Below is an illustration of [react-clock](https://www.npmjs.com/package/react-clock), a module for visualization clocks. 

[![Clock example](../images/react-clock-exampe.png "Clock Example")](../images/react-clock-example.png)


### How it works

As described in our [package.json release](Packagejson.md), third party modules can be declared in a package.json file. Our system will download and bundle these assets along with the agent. The only requirement is that the agent utilizes [Webpack bundling](WebpackAssets.md). Afterwards, developers will be able to `require` their third party modules and utlize them within their own source files.

An illustration of package.json for react-clock:

```
{
  "dependencies": {
    "react-clock": "^2.4.0"
  }
}
```

An illustration of requiring this component within a source file:

```
const Clock = require('react-clock')

export class ns_MyEntityData extends PureComponent
  constructor: (props) ->
    super props
    @state = date: new Date()

  componentDidMount: ->
      updateDate = () => @setState date: new Date)_
      setInterval updateDate, 1000
  
  render: ->
    R.div null,
      R.p null, "Current Time"
      React.createElement Clock,
        value: @state.date

```
