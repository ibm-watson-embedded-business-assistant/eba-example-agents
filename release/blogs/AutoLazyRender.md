## Auto lazy rendering

In the case that data sent to certain OpenWhisk invocations to `@render` endpoint exceed the established limit, EBA will now automatically convert it to lazy data, elimanting any performance side effects related to this data volume. Our team has provided the appropriate helpers to in the [eba helpers module](https://www.eba.ai/docs/lab/NodeHelpers.html) for working with lazy data, and teams may consult our [documentation](https://www.eba.ai/docs/lab/endpoints/Render.html) related to @render for a reference on how to access data within this endppint.
