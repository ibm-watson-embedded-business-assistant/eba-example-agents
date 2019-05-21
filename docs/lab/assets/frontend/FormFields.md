## Form fields

EBA messages provide native support for form fields using a simple interface. This interface will enable you to supply forms as part of your messages to users. For any concept which subclasses from `:Message`, you can simply append a list of forms attached as the underlying data for the message. For instance, consider the example below, where we add a form to request a file name during an upload event.

```
return new Result()
    .setData(':UploadEvent', {
      data: [{name: "File Name", value: null, regex: null}],
      name: ":FormFields",
      tags: ["markdown"]
    })
```

### Form interface

You will note that a `:FormFields` take a list of forms as a data. Each form conforms to the following interface:

- name -- a required name of the form field, which describes the data being requested
- value -- an optional value of the form field itself
- regex -- an optional regular expression to validate inputs
