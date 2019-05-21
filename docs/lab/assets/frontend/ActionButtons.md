## Action buttons

EBA messages provide native support for actions via button clicks using a simple interface. This interface will enable you to apply a set of actions associated with a message via natural language. For any concept which subclasses from `:Message`, you can simply append a list of actions attached as the underlying data for the message. For instance, consider the example below, where we add an action to upload a file.

```
return new Result()
    .setData(':UploadEvent', {
      data: ["upload file"],
      name: ":Actions",
      tags: ["markdown"]
    })
```

### Action interface

`:Actions` take a list of strings as data, where each string represents an NL directive for triggering certain semantic actions. In fact, these actions are implemented using our `bridge.trigger` functionality, where each button click on these actions actually runs their contents as a new question within the user's conversation. Consequently, in order to ensure that actions produce their desired effect, there should be relevant semantic actions in place within the action to handle these questions.
