## Trace endpoint

EBA team introduces `@trace` to our list of [endpoints](../../docs/lab/Endpoints.md). Recall that endpoints are processes within EBA's execution pipeline, which developers may make use of according to their varying purpose. The `@trace` endpoint is implemented as the final phase in our event processing pipeline, and it is designed for developers to _trace_ or _observe_ everything which occured inside of EBA for a given question or event. In this endpoint, we expose to developers all the low level actions which EBA took to construct the user's information space, including concept reasoning meta, underlying data from actions, timing metrics, etc. With this endpoint in place, developers can obtain a record of all relevant events and forward them to their external systems for offline processing. 

There are a few techinical specifications developers should be familar when implementing this endpoint. You may read about this in our [@trace endpoint]() documentation.

### Use cases

This endpoint provides developers the ability to supply their conversational history to offline machine learning pipelines. For instance, using the `@trace` endpoint, you may monitor special types of interactions such as user training events, feedback events, empty responses, etc. to form useful insights. Additionally, `@trace` can lend itself to use cases for training on NLU, such as tailoring concept annotations and handling foreign language input based on historical observations. 

