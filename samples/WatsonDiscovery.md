This agent allows you to search content using Watson Discovery. It utilizes our @fallback endpoint which is triggered when Watson Assistant detects that a given question does not surpass its understanding level threshold. In such cases, the agent processes this question by sending it to Watson Discovery. Consequently, this agent provides an illustration how Watson Assistant can be leveraged as a fallback documentation service in conjunction with other traditional agents.

To get the most out of this sample, please load the [yaml configuration](./WastonDiscovery.yaml) into your own sandbox enviornment.

## Dev Notes

### General

To connect to Watson Discovery via the Watson Developer Cloud modules provided in the IBM Cloud FaaS node.js runtime. You will need to enter some secret credentials, including username and password, as well as certain settings, such as collection id and envionrment id. This values will be accessed respectively via `params.secrets` and `params.setting` within the `@fallback` endpoint.

### Fallback

As alluded to above, [@fallback](../docs/lab/endpoints/Fallback.md) is an endpoint which is triggered when EBA determines that it cannot sufficently understand a question, i.e. the level of understanding does not surprass its designated threshold. In such cases, as a last resort, EBA will process this question in one shot utilizing whatever logic is provided within this endpoint. In this case, we establish a connection to Watson Discovery and query our documentation collection with the user's original question. Note that this particular example, passes the user's original question as is.

### Assets

This example provides another illustration of how to render your underlying data in a way to makes sense to your end users. Within a frontend asset titled 'watson-discovery-viz.coffee' we implement the appropriate logic for rendering a list of articles produced by the Watson Discovery search engine. Note that this visualization utilizes one of our [native UI components](../docs/lab/UIComponents.md), viz. our List component. 
