## Web Integration

It is possible to integrate Watson Assistant directly into your own web application as an embedded window. You can view a [working example](https://ibm-watson-embedded-business-assistant.github.io/eba-example-agents/docs/integration/index.html).

There are two simple steps required to perform this integration:

1. Add a script tag that initializes a global IBM_EBA interface object
2. Calling the api exposed by the IBM_EBA object

### Adding IBM_EBA and Calling Setup

This script should be loaded in the start of your application by simply adding a script tag which points to the path of the script. After loading this script, you should execute `IBM_EBA.setup` to pass any relevant data and credentials for logging into a session with the assistant. Note, in the example below, we have added an additional script tag in the beginning of the file to illustrate a method for providing custom intialization.

```
<head>
    <title>Host Application</title>
    ...
    <script>
        IBM_EBA_CONFIG = {
            agent_name: 'Agent Kevin',
            disable_button: false,
            disable_shadow: true,
            loading_delay: 1000
        }
    </script>
    <script src="https://eba.ibm.com/static/assistant.js" defer></script>
</head>
```
With these few lines of code in your host application, Watson Assistant will be up and running.

As mentioned above, you can pass in the following fields to customize Watson Assistant either via optional global object `IBM_EBA_CONFIG` or during the call to `IBM_EBA.setup`, viz. 

* `access_token` –– JWT access token, check Settings tab in Lab for more details.
* `agent_name` –– replaces Watson as the name to whatever is supplied.
* `agent_voice` –– tunes Watson Assistant's voice. Check [the list of voices](./Voices.md) supported by Watson Assistant.
* `user_first_name`, `user_last_name`, `user_full_name` –– makes Watson Assistant aware about current user so it will use personalization in answers.
* `user_locale`, `user_language` –– defines cultural settings which are used to detect and format numbers, dates and currencies in conversation flow.
* `user_time_zone` –– defines user time zone which will be used for operations with local dates.
* `disable_button` –– disables floating button control when set to true, enables floating button control when set to false.
* `disable_shadow` –– disables modal shadow when set to true, enables modal shadow when set to false.
* `loading_delay` –– delays EBA iframe loading by given number of miliseconds, it helps to avoid showing browser spinning wheel while iframe is loading is background.

In order to create a new session for authorized user you will need to supply a JWT signed `access_token`. An `access_token` should be generated based on the `iss`, `sub`, and `private key` provided within our Lab Settings, where we have outlined the required integration steps. For an example on generating this `access_token` programatically, please reference our [headless integration](./Headless.md)

### IBM_EBA API

* `create()`      –– creates the IBM_EBA object and injects assistant into host application (note: this is called within this script itself and should be avoided)
* `setup(config)` –– posts a setup message to Watson Assistant containing the supplied config
* `destroy()`     –– destroys the IBM_EBA object and all related DOM elements
* `send(event)`   –– posts a JSON event message to Watson Assistant
* `open()`        –– opens the window containing the assistant
* `close()`       –– closes the window containing the assistant (note: may render the assistant is compact mode if the last message was tagged as important)
* `detach()`      –– detaches the assistant into a new tab for full screen experience
* `toggle()`      –– toggles the state of the window from opened to closed
* `showPopup()`   –– shows the window as a popup when it is in a hidden state
* `hidePopup()`   –– hides the popup window when it is in a hidden state


Since IBM_EBA is a global object, you will be able to send data to the assistant anytime you like by simply invoking `IBM_EBA.send`. This enables you to encode various events across your web application. For instance, here is a click event that triggers an order event inside of Watson Assistant:

```
<button onclick="javascript:IBM_EBA.send({
    order_meta: {
        order_id: 1234,
        order_name: "paper",
        customer_id: 5678
    }})">View Order</button>
```

Using our development lab, you will be able to program the assistant to appropriately respond to this event. You may invoke the other api functions across your event handlers in a similar fashion. For details on how to respond to such events using Watson Assistant, please refer to our [@react endpoint](../lab/General#endpoints).

### Display Modes

Watson Assistant supports four display modes which reflect the size of the embedded iframe: 

* `default` is 375px X 85%.
* `expanded` expands the default width to 80%.
* `compact` recieves its height dynamically based on its content.
* `detached` renders Watson Assistant in a new tab.

Note: `compact` mode is designed to only show the content of the last message and serves as a popup. The show/hide semantics for `compact` mode is as follows: if the iframe is in a hidden state and the most recent message is tagged as `important`, then the popup will be shown. Otherwise, it will be hidden. Hence `compact` is designed to give the assistant a way to show itself on screen while it is hidden.

