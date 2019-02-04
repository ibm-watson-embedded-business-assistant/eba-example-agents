The main binary program must be located in /action/exec inside the container.
The executable receives the input arguments from a single command-line argument string,
which can be deserialized as a JSON object.
It must return a result by using `stdout` as a single-line string of serialized JSON.
