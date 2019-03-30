## This is *not* a chatbot. This is EBA.

Business Assistant ... Digital Twin ... Business Process AI ... whatever you call it by, engineers need the best techniques in order to bring valuable AI to their customers.  EBA presents a unique and proven model based on modern, patent-pending, approach to machine reasoning.

The Embedded Business AI (“EBA”) framework is an omni-channel, enterprise-class, digital AI framework used by developers to enable advanced domain-specific business process use cases for end-users. Unlike other dialog management systems that use rule-based reasoning and predicate logic, with EBA you describe your business domain to the machine in a simple, consistent, complete and straightforward way. Dialog (whether human:machine or machine:machine interaction) are simply inputs to and outputs from the reasoning core.

In other words: this is *not* a chatbot.

[![Watson Marketing Assistant powered by EBA](/assets/img/eba_wma_screenshot.png "Watson Marketing Assistant powered by EBA")](/assets/img/eba_wma_screenshot.png)

## What can you do with EBA?

In the video below, see how IBM used EBA to create an omni-present "digital twin" for marketing professionals that supports its human counterpart wherever she may conduct business. 

[![IBM Watson Marketing](https://img.youtube.com/vi/KlavNwVEEuU/0.jpg)](https://www.youtube.com/watch?v=KlavNwVEEuU)

We also have sample agents for other domains, like Supply Chain, within the [dev lab](https://eba.ibm.com/assistant#/lab) for you to dig into.


## Current major features ##

* EBA core reasoning machine 
  * Standards-based semantic ontology
  * Base-level language understanding
  * Domain-specific language understanding
  * Language extensions and annotations supported via embedded extention for business user
  * Disambiguation handling provided via embedded extensions for business user 
  * Automatic language translation for non-English input
  * Business organization-scoped persistence of language extensions
  * Data management provided via concept-linked actions (link any API/source to EBA core)
  * Automatic management of misspellings
  * Embedded thesaurus supports automated permutation handling within EBA core
  * Ontology-driven polymorphic actions and rules
  * Longitudinal and session based self-learning for increased accuracy in response
  * NLG-derived response framework -- NO hardcoded outputs!
  
* Business process extensions
  * Multi-channel and cross-channel mode
  * Time-series evaluation
  * Multi-human actor mode
  * Track and notify business user for any data state change
  * Flexible data visualization, including plotting arbitrary vectors
  * Next-best action suggestions based on current session state 
  * Non-conversational data mode (process state/transition observation)
  * Weather Data
  * Generic tone analysis 
  * News 
  * User and organizational profiling (goals, language)
  
* UI core and extensions
  * Headless integration with other chat services
  * HTML/ReactJS chatbot-style experience
  
* Developer lab experience
  * Embedded directly in interface. No tools required.
  * Diagnostic tools
  * Instant self-service onboarding
  * Contextual documentation, tutorials, examples
 
## Recent updates

 * [Activation & De-activation of agent components](./release/blogs/ComponentActivation.md)
 * Activation & De-activation of EBA agents by users including OOB agents
 * EBA responses now can be made available via URL
 * Natural Language patterns now uses Markdown syntax
 * Patterns now support synonyms, including compound sysnonyms via new Markdown syntax
 * Regular Expressions are now supported within NL patterns
 * Support to use arbitrary text in semantic actions via new concept class ":FreeText"
 * Updates to the code editor now support comments, highlighting, find & replace

## Contributing

This is the public home of the Embedded Business AI framework ("EBA"). Please log [issues](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/issues) you encounter with EBA, and if you have a contribution, please submit a [pull request](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/pulls).

## License

EBA is a platform constructed and operated by the [Watson Customer Engagement](https://www.ibm.com/customer-engagement) platform engineering team. This repository hosts documentation and sample configurations that work with the EBA core platform. This content is licensed under the Apache 2.0 license. Full license text is
available in [LICENSE](LICENSE).
