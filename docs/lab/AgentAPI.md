### Agent API

For some reason it can be necessary to communicate with your own agent directly using the REST API. To allow your agent to handle requests from client side you need to add a new endpoint with the name `@api`. The following example implements echo API which takes the input and returns it as the output:

```
module.exports.main = function(params) {
  return {
    output: params.input
  }
}
```

To be able to call this API from the client side you need to create an instance of `AgentInterface`. The AgentInterface has the method `request` which takes input data, calls the `@api` endpoint and returns a promise:

```
class MyDataRenderer extends React.Component {
  constructor(props) {
    super(props)
    this.agentInterface = new AgentInterface("sandbox", props)
  }

  handleClick() {
    this.agentInterface
      .request({ foo: "bar" })
      .then(json => console.log(json))
      .catch(xhr => console.log(xhr))
  }

  render() {
    return <a onClick={() => this.handleClick()}>test API</a>
  }
}
```
