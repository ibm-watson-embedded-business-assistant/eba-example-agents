## API Endpoint

The api endpoint is used in cases where you wish to communicate directly to your own agent from the front end. In other words, this endpoint enables your agent to handle requests to itself from the client side. Within the endpoint, we will receive certain input params, i.e. `params.input`. These are the input parameters passed to the client request. The following paradigm should be employed to enable this functionality:

- on the client side, create an instance of the `AgentInterface` supplying agent name and `props` to its constructor. (Note that "sandbox" is a hardcoded name in the sample below. The name of your agent should be dynamically supplied from the backend to the client side so that it is made available to your UI component. Agent name is supplied as part of our `params`.)
- invoke the instance method `request` with the desired data object as argument (note: returns a Promise)
- on the agent side, implement `@api` which processes this input data and returns desired results

Below is an example that implements an 'echo' api request example, where `@api` simply returns the input data it receives.

Example:

In your frontend asset, add the following:

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

Within your agent's `@api` endpoint, add the following:

```
const {Result} = require('eba')
module.exports.main = function(params) {
  return new Result(params.input)
}
```
