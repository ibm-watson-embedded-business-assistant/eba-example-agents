This sample agent can get you the current time in a given geopolitical entity. The agent uses GeoNames API to get the information about the timezones.
To get the most out of this sample, please load the [yaml configuration](./CurrentTime.yaml) into the Lab. You will need to supply your own username within settings. You can get one by registerning at [GeoNames.org](https://www.geonames.org/).

Once the agent is configured you can ask questions like "show me the current time in New York" or "What is the current time in Austria?".

## Dev notes

The agent defines one concept `time:CurrentTime`. As well as the action `time:GetCurrentTime`.
This action takes data of another concept `spacy:GeopoliticalEntity`. This concept is handled by the agent called 'SpaCy'.
EBA is a collaborative reasoning framework which can find the best appropriate combination of agents and semantic actions to answer a question. In our case SpaCy agent will be responsible to detect and handle geopolitical entities like cities or countries. The time agent will take an output from SpaCy agent as an input for it's own action to provide the current time.
