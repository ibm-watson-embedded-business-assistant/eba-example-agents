## Start endpoint

The start endpoint is run at the start of your session. Depending on your particular application, you may need to perform some initial setup to external systems or resources, e.g. obtain access token to be used in subsequent api calls. Another common use case for the start endpoint is to persist data locally throughout the session. For this purpose you can use our `store` api. The main factor to be considered when using the start endpoint is the availability of the data your are initializing. The endpoint is only run once, and, consequently, it should not be used for tasks that require routine updates, e.g. maintaining a list of named entities from external database that is updated in real time.

Below is an example that illustrates how to store a token on the start of a given session.

Example:

```
const client = require('./client.js');
const eba = require('eba');

module.exports.main = async (params) => {
    const token = await client.getToken();

    // persist token for subsequent calls
    return new eba.Result().store('token', token);
};
```