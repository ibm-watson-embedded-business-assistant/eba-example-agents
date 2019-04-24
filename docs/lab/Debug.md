## Debug tab

This is responsible for showing debug output related to action invocations. EBA uses IBM FaaS to execute actions, and we have provided details related to timings, logs, and other information within this tab.

To view logs, click the show button within the appropriate entry. Any logs you programmatically execute will be displayed here.

Referencing the timing metrics from IBM Faas, we have the following breakdown.
`duration`  -- time, in milliseconds, that it took for the activation to complete
`init time` -- time spent initializing the function
`wait time` -- time spent waiting in the internal OpenWhisk system
`full time` -- end-to-end time for EBA to return result

[Learn more about debugging EBA](../articles/DebuggingWatsonAssistant.md)
