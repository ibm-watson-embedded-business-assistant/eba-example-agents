### Web App Integration

It is possible to integrate Watson Assistant directly into your own web application as an embedded iframe.

There are two simple steps required to perform this integration:
    1. Add a script tag that initializes a global IBM_EBA interface object
    2. Calling the api exposed by the IBM_EBA object

#### Adding IBM_EBA and Calling Setup

This script should be loaded in the start of your application by simply adding a script tag which points to the path of the script. After loading this script, you should execute `IBM_EBA.setup` to pass any relevant data and credentials for logging into a session with the assistant. 

```
<head>
    <title>Host Application</title>
    <script src="https://eba.ibm.com/static/host.js"></script>
    <script>
        IBM_EBA.setup({
            // credentials
            // meta data
        })
    </script>
</head>
```

With these few lines of code in your host application, Watson Assistant will be up and running.

#### IBM_EBA API

* `setup(config)` -- uses the iframe to post a setup message to Watson Assistant containing the supplied config
* `send(event)`   -- uses the iframe to post an stringified event message to Watson Assistant

Since IBM_EBA is a global object, you will be able to send data to the assistant anytime you like by simply invoking `IBM_EBA.send`. This enables you to encode various events across your web application. For instance, here is a click event that triggers an order event inside of Watson Assistant:

```
<button onclick="javascript:IBM_EBA.send({
    orderMeta: {
        orderID: 5678,
        orderName: 'Paper',
        customer: 1234
    }})">View Order</button>
```

Using our development lab, you will be able to program the assistant to appropriately respond to this event.

#### Display Modes

Watson Assistant supports four display modes which reflect the size of the embedded iframe: 

* `default` is 375px X 85%.
* `expanded` expands the default width to 80%.
* `compact` recieves its height dynamically based on its content.
* `detached` renders Watson Assistant in a new tab.

Note: `compact` mode is designed to only show the content of the last message and serves as a popup. The show/hide semantics for `compact` mode is as follows: if the iframe is in a hidden state and the most recent message is tagged as `important`, then the popup will be shown. Otherwise, it will be hidden. Hence `compact` is designed to give the assistant a way to show itself on screen while it is hidden.


#### Customizations

During the call to `IBM_EBA.setup`, you can pass in the following fields to customize Watson Assistant, viz. 

* agent_name -- replaces Watson as the name to whatever is supplied
* agent_voice -- tunes Watson Assistant's voice (check Watson STT for available voices)
* user_first_name, user_last_name, user_full_name -- makes Watson Assistant aware about current user so it will use personalization in answers.
