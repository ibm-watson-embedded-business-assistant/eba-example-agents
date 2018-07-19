## Greetings from the EBA Core Engineering Team

This is the public home of the Watson Embedded Business Assistant ("EBA"). EBA is an AI framework comprised of a proprietary feature-rich machine reasoning core, generic & industry domain-specific business agents, and an interactive user experience. 

## Brief History of Watson Embedded Business Assistant ("EBA") ## 

EBA began in 2016 as a proof of concept. The aim was to create a digital assistant for the business practioner using modern techniques in machine reasoning. We started by describing and emulating the nature of the intern-- growing from a helpful admin, not capable of making decisions, into a trusted employee. In order to do this, we needed to erase the typcal intent-based pre-crafted predicate rule system ans develop a wholly new approach to observation, self-learning, and domain application. We also recognized we needed to divorce the developer from on-going care and feeding of the AI, receiving full instruction through passive and active interaction with the business user. We needed to code a framework for an AI that becomes curious about its business context, and seeks to fill gaps in knowledge. 

Once we established the domain-agnostic design of the reasoning core, we crafted a semantic ontology layer using a standards-based approach (OWL 2.0). This layer allowed us to craft domain-specific ontological extensions used to teach the reasoning core the language of Commerce, Marketing and Supply Chain (leveraging the business experts within IBM Watson Customer Engagement). This logical layer is the ground truth upon which the reasoning core operates-- bridging inbound human crafted questions and action with the subordinate APIs (representing the physical layer of system data and functions). 

What we found through these early years of EBA engineering was a profound means with which to deliver total one-to-one application experiences for the business practitioner.  Whereas customers may select best of breed vendors to run their operations, EBA functions as the over the top experience linking cross functional processes and data across disparate vendors within various clouds and on-premise systems. Much in the same way retailers attempt to create one-to-one personalized experiences for their customers, EBA was becoming the means to create one-to-one command and control experiences for the business practitioners across any domain-- a workspace that morphs itself to accomodate the most important tactical and strategic tasks that the human needs to address based on positive/negative affects on KPI; where KPIs are the rules of engagement governed by the humans upon which the machine will operate.

While we haven't yet released the "curiosity extension", we feel we've advanced our work enough to share it with you. We have  opened up this fully self-contained business user and lab experience, along with a base set of contributing agents. In this way, our colleagues can craft custom AI-driven business experiences for their own use cases right along side our team. Please explore this public repository for articles and deeper dives on what powers EBA.

## EBA Constructions ##

EBA borrows from many well-established machine reasoning techniques dating back to the 1980s and later. We've attracted a core group of engineers that have taken these concepts and greatly expanded on them through elegant functional design. In fact, EBA core was built using Haskell. Domain-agent extensions can be written in any language thanks to IBM Cloud Functions and the integration we've crafted to bridge other runtimes with our reasoning core.

Please visit [Programming Watson Assistant](docs/LandingPage.md) for more information about EBA construction and building extensions using our sample agents included in this repository.

## Current Major Features ##

* EBA Core Reasoning Machine OOTB
  * Standards-based semantic ontology
  * Base-level language understanding
  * Domain-specific language understanding
  * Language extensions and annotations supported via embedded extention for business user
  * Disambiguation handling provided via enbedded extenstions for business user 
  * Automatic language translation for non-English input
  * Business organization-scoped persistence of language extensions
  * Data management provided via concept-linked actions (link any API/source to EBA core)
  * Automatic management of mispellings
  * Embedded thesaurus supports automated permutation handling within EBA core
  * Ontology-driven polymorphic actions and rules
  * Longitudinal and session based self-learning for increased accuracy in response
  * NLG-derived response framework -- NO hardcoded outputs!
*  Business Process Extensions
  * Multi-channel and cross-channel mode
  * Multi-human actor mode
  * Track and alert business user for any data state change (basic anomaly detection)
  * Flexible data visualization, including plotting arbitrary vectors
  * Next-best action suggestions based on current session state 
  * Non-conversational data mode (process state/transition observation)
  * Weather Data
  * Generic tone analysis 
  * News 
  * User and organizational profiling (goals, language)
* UI Core and Extensions
  * Headless integration with other chat services
  * HTML/ReactJS chatbot-style experience
* Developer Lab Experienc
  * Embedded directly in interface. No tools required.
  * Diagnostic tools
  * Instant self-service onboarding
  * Contextual documentation, tutorials, examples
* Easter egg
 
## Prospective Features ##

* EBA Core Reasoning Machine
  * Curiosity extension

Please log issues you encounter with EBA, and if you have a contribution, please submit a pull request.

