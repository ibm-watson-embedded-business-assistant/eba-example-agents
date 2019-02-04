## Endpoints

Watson Assistant provides developers with control over various stages of its execution pipeline. Endpoints represent different proccesses that developers can utilize to achieve different behaviors suitable to their particular application. We support the following endpoints:

- [@start](./endpoints/Start.md): session initialization process which can be useful for setting up connections to dependent systems/resources.
- [@annotate](./endpoints/Annotate.md): annotation process by which concepts are introduced into the parse tree.
- [@force](./endpoints/Force.md): lazy data execution process which converts lazy meta information into real data
- [@react](./endpoints/React.md): event handling process for evaluating and dispatching incoming events
- [@render](./endpoints/Render.md): rendering process used for formatted responses to external channels (Slack and Watson Workspace)
- [@api](./endpoints/API.md): api registration process for enabling backend operations to be executed within frontend assets
- [@fallback](./endpoints/Fallback.md): documentation fallback process used to supply default responses to unhandled questions
