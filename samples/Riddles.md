This agent helps you solve riddles! It is an example of a "take over" agent in Watson Assistant, i.e. an agent which, given a certain trigger, can take control of an entire conversation.

When the user says "Watson, ask me a riddle", this agent will respond accordingly and begin to supply custom annotations for subsequent interactions. It maintains its own gameplay logic until the user exists the game.

To get the most out of this sample, please load the [yaml configuration](./riddles.yaml) into your own sandbox enviornment.

### Dev Notes

#### General

The Riddle agent provides an @annotate endpoint. This endpoint checks to see whether the agent has been triggered to listen to incoming interactions. If it has been triggered to listen, it will supply the custom annotation `riddle:PossibleAnswer` to every token in the interaction, meaning that the entire user input will be treated as a possible answer to the riddle. Additional checks to see whether the user has stopped the game or asked for a clue is provided. `riddle:Clue` and `riddle:Stop` are supplied to the agent via patterns. When the agent sees these patterns, it will not render the input as `riddle:PossibleAnswer`. Instead, it will execute the appropriate gameplay logic driven by its actions.

#### Concepts

Concepts may be categorized as follows. The concepts `riddle:StartGame` and `riddle:Stop` correspond to the entry and exit points of the agent. Labels are supplied to the agent via patterns so that it can recognize these events. Next there are gameplay concepts, viz. `riddle:Question`, `riddle:Clue`, `riddle:Message`, and `riddle:PossibleAnswer`. When the agent needs to respond the user within the chat to the user, it marks the corresponding concept as a subclass of :Message. For instance, on `riddle:Question`, we must ask the user a riddle in the form of a question. Subclassing from `:Message` is a natural way to put this question into the chat interface. There are few other auxilary concepts provided by the Assistant, e.g. :Cancellation and :Confirmation. These concepts are already built into the assistant and are used in cases when we ask the user for action confirmation.

#### Actions

The Riddle agent makes uses of a gameplay.js asset to provide actual game play logic. The actions provide a way to map concepts to data. Note that when we provide data for those concepts that derive from `:Message` we are directly passing this to the user within the chat interface. Concepts to data mapping are organized in a manner that is consistent with the game. Hence organizations of the actions is largely contigent on domain or game in this case.

#### Assets

gameplay.js contains logic for handling questions, clues, answers, and exit logic for the game. It utilizes the "eba" package to set parameters, such as `listenAnswer:true`, as well as data on certain concepts. Takeover agents almost by definition have to manage execution state internally. Assets are a good place to register this functionality.
