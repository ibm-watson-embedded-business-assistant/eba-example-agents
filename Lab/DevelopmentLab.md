The developement lab was created in an effort to enable an open system of Watson Assistant skill developers. Using the lab tools, developers can write skills to extend Watson Assistant to their organizational and personal needs. This document contains an overview of the various features and components of the lab.


### Lab Actions Bar

#### Agent Selector

You can use the agent selector to view and edit other agents. You will have read access to all agents, but write access only to your own agents. You are invited to view these public agents as a reference in the course of your development.

#### Undo and Redo

Our lab will maintain a history of your most recent changes within a given session. You may redo and undo changes accordingly.

#### Saving and Discarding

In order for your changes to be published to EBA core, you must click the Save changes button. This will update your configuration, and the lab will remember this configuration the next time that you log in. If in the course of development, you want to back out your current change set, pressing the Discard changes button will revert your work back to the most recent published version. 

Once you have saved your changes, you may immediately begin to test your work by asking the assistant questions in the left message panel. 

#### Import and Export

The skills you develop within the lab are represented in an SCM friendly, yaml configuration. You can import and export this configuration using the "Import" and "Export" buttons on the lab actions bar.


### General

#### Description

The description is a useful place to describe your skill as well as the sorts of questions that it supports. It is designed to serve as an intial refernce when sharing and collborating with others.

By clicking the edit button, you will be able to enter custom markdown in a code editor. Once you apply these changes, you will immediately see the changes reflected.

#### Settings

Settings is useful place to skill level parameters. It may be used to store credential information, such as api keys. These parameters will be accessible to agents later in the action development pipeline via function input parameters.

#### Endpoints

Watson Assistant supports certain special endpoints that can be activated during the reasoning pipeline. Currently we support `@start`, `@tag`, and `@force` endpoints. `@start` is used to initial any storage configuration any session intialization parameters that your agent supports. `@tag` is used to support custom annotation. This is a useful place to support named entity recognition for your skill's domain. `@force` is used in the context of lazy data evaluation. When a series of lazy data operations is finally required by the assistant, it will call this endpoint to fetch the real data beneath the lazy operations.

### Concepts









