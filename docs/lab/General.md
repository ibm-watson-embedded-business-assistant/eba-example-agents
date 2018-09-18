## General tab

### Description

The description is a useful place to describe your skill as well as the sorts of questions that it supports. It is designed to serve as an intial reference when sharing and collborating with others.

By clicking the edit button, you will be able to enter custom markdown in a code editor. Once you apply these changes, you will immediately see the changes reflected.

### Settings

Settings is a useful place to specify skill level parameters. These parameters will be accessible to agents later in the action development pipeline via function input parameters. It may be used to store credential information, such as API keys. 

### Endpoints

Watson Assistant provides developers with control over various stages of its execution pipeline. Endpoints represent different proccesses that developers can utilize to achieve different behvaiors suitable to their particular application. We support the following endpoints:

- [@start](./endpoints/Start.md): session initilization process which can be useful for setting up connections to dependant systems/resources.
- [@annotate](./endpoints/Annotate.md): annotation process by which concepts are introduced into the parse tree.
- [@force](./endpoints/Force.md): lazy data execution process which converts lazy meta information into real data
- [@react](./endpoints/React.md): event handling process for evaluating and dispatching incoming events
- [@render](./endpoints/Render.md): rendering process used for formatted responses to external channels (Slack and Watson Workspace)
- [@api](./endpoints/API.md): api registration process for enabling **backend** operations to be executed within frontend assets
- [@fallback](./endpoints/Fallback.md): documentation fallback process used to supply default responses to unhandled questions
