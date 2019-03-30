## This is *not* a chatbot. This is EBA.

Business Assistant ... Digital Twin ... Business Process AI ... whatever you call it by, engineers need the best techniques in order to bring valuable AI to their customers.  EBA presents a unique and proven model based on modern, patent-pending, approach to machine reasoning.

The Embedded Business AI (“EBA”) framework is an omni-channel, enterprise-class, digital AI framework used by developers to enable advanced domain-specific business process use cases for end-users. Unlike other dialog management systems that use rule-based reasoning and predicate logic, with EBA you describe your business domain to the machine in a simple, consistent, complete and straightforward way. Dialog (whether human:machine or machine:machine interaction) are simply inputs to and outputs from the reasoning core. In other words: this isn't a chatbot.

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
  

## EBA history

EBA began in 2016 as a proof of concept. The aim was to create a digital assistant for the business practioner using modern techniques in machine reasoning. We started by describing and emulating the nature of the intern– growing from a helpful admin, not capable of making decisions, into a trusted employee. In order to do this, we needed to erase the typical intent-based pre-crafted predicate rule system and develop a wholly new approach to observation, self-learning, and domain application. We also recognized we needed to divorce the developer from on-going care and feeding of the AI, receiving full instruction through passive and active interaction with the business user. We needed to code a framework for an AI that becomes curious about its business context and seeks to fill gaps in knowledge.

Once we established the domain-agnostic design of the reasoning core, we crafted a semantic ontology layer using a standards-based approach (OWL 2.0). This layer allowed us to craft domain-specific ontological extensions used to teach the reasoning core the language of Commerce, Marketing and Supply Chain (leveraging the business experts within IBM Watson Customer Engagement). This logical layer is the ground truth upon which the reasoning core operates– bridging inbound human crafted questions and action with the subordinate APIs (representing the physical layer of system data and functions).
What we found through these early years of EBA engineering was a profound means with which to deliver total one-to-one application experiences for the business practitioner. Whereas customers may select best of breed vendors to run their operations, EBA functions as the over the top experience linking cross functional processes and data across disparate vendors within various clouds and on-premise systems. Much in the same way retailers attempt to create one-to-one personalized experiences for their customers, EBA is becoming the means to create one-to-one command and control experiences for the business practitioners across any domain– a workspace that morphs itself to accommodate the most important tactical and strategic tasks that the human needs to address based on positive/negative effects on KPI; where KPIs are the rules of engagement governed by the humans upon which the machine will operate.

While we haven’t yet released the “curiosity extension”, we feel we’ve advanced our work enough to share it with you. We have opened up this fully self-contained business user and lab experience, along with a base set of contributing agents. In this way, our colleagues can craft custom AI-driven business experiences for their own use cases right alongside our team. Please explore this public repository for articles and deeper dives on what powers EBA.

## Contributing

This is the public home of the Embedded Business AI framework ("EBA"). Please log [issues](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/issues) you encounter with EBA, and if you have a contribution, please submit a [pull request](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/pulls).

## License

EBA is a platform constructed and operated by the [Watson Customer Engagement](https://www.ibm.com/customer-engagement) platform engineering team. This repository hosts documentation and sample configurations that work with the EBA core platform. This content is licensed under the Apache 2.0 license. Full license text is
available in [LICENSE](LICENSE).
