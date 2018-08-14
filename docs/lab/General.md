### General tab

#### Description

The description is a useful place to describe your skill as well as the sorts of questions that it supports. It is designed to serve as an intial reference when sharing and collborating with others.

By clicking the edit button, you will be able to enter custom markdown in a code editor. Once you apply these changes, you will immediately see the changes reflected.

#### Settings

Settings is a useful place to specify skill level parameters. These parameters will be accessible to agents later in the action development pipeline via function input parameters. It may be used to store credential information, such as API keys. 

#### Endpoints

Watson Assistant supports certain special endpoints that can be activated during the reasoning pipeline. Currently we support `@start`, `@tag`, and `@force` endpoints. `@start` is used to initialize any storage configurations and session intialization parameters that your agent supports. `@tag` is used to support custom annotation. Annotations are a good place to support named entity recognition for your skill's domain. `@force` is used in the context of lazy data evaluation. When a series of lazy data operations is finally required by the assistant, it will call this endpoint to fetch the real data beneath the lazy operations.
