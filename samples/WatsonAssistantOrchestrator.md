This [sample](./WatsonAssistantOrchestrator.yaml) illustrates a method of integrating different assistants built with Watson Assistant (WA) into the EBA framework. In particular, it highlights how EBA can function as an orchestrator to these various assistants.

### config 

As outlined within the agent's description, there is one preliminary asset which should be configured within the agent, viz. `config.js`. This configuration file simply outlines the different instances you wish EBA to orchestrate. The following information should be provided to describe a given instance:

  - gateway -- the url gateway to your service, e.g. `https://gateway.watsonplatform.net`
  - assistant_id -- the id to your assistant
  - workspace_id -- the id of your workspace for this particular application
  - username -- the username of your service instance
  - password -- the password of your service instance
  - context -- optionally, the initial context to your assistant

## fallback

The Watson Assistant Orchestrator agent utilizes our `@fallback` endpoint as an entry point into its orchestration. This means that your WA instances will be considered for execution in the event that our native processing pipeline is not able to resolve a user's question. In the event that `@fallback` is triggered, the orchestrator agent will probe each instance by passing along the user's input and selecting the response with the highest confidence score. Having selected the most confident assistant, we execute then execute the question against assistant, propagating the response to the user. Note that sessions are tracked within the assistant provide a stateless _probing_ phase as well as an _execution_ phase which actually serves to advance the dialog. We utilize both V1 and V2 Watson apis for this purpose.
