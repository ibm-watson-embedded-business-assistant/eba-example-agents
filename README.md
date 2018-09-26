## Greetings from IBM's Embedded Business Assistant ("EBA") engineering team

This is the public home of the Embedded Business Assistant ("EBA"). Please log [issues](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/issues) you encounter with EBA, and if you have a contribution, please submit a [pull request](https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/pulls).

[![Watson Marketing Assistant powered by EBA](/assets/img/eba_wma_screenshot.png "Watson Marketing Assistant powered by EBA")](/assets/img/eba_wma_screenshot.png)

## About EBA

The Embedded Business Assistant (“EBA”) is an omni-channel, enterprise-class, digital assistant for the business practitioner that supports its human counterpart wherever she may conduct business. This could be across any domain (marketing, commerce, or supply chain for example) and many channels including chat, Slack, workspaces, voice, and (soon) SMS, utilizing any addressable source including databases, APIs, IoT endpoints, automotive sensors. The mission of EBA is to understand the basis of human decisions through observation over time, derive the motivation behind actions in an environment, and then codifying the path and results for machine interpretation and future autonomic response.


## What can you do with EBA?

Here's a video we published that promotes the IBM Watson MArketing Assistant which was constructed using EBA technology.

<iframe style="max-width: 100%" src="https://www.youtube.com/embed/KlavNwVEEuU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

We also have sample agents within the [dev lab](https://eba.ibm.com/assistant#/lab) for you to dig into.


## Why EBA?

Chat bots have proven incapable of handling the breadth and complexity of language, tasks, and processes in the workplace. If you’ve experienced the frustration of trying to train a standard chat bot to be contextually aware or to execute tasks across business domains and multiple channels, we offer that EBA will prove to be a better solution for your AI use case pattern engineering.
 
### Experience
The engineering team behind EBA has a combined 40 years in active AI development, including half of that time spent specifically on machine reasoning. We are well versed in many theoretical and practical machine reasoning designs including basic rules, case-based, blackboard, and PRS. (some tenets of PRS have proven valuable). You can rely on a team that is constantly analyzing leading edge movements in reasoning techniques - all for your benefit. You concentrate on the use cases that will bring customer value, EBA has your back.

### Environment
EBA was built for developers, by developers. We’ve taken (and will continue to take) as much complexity out of crafting, designing, presenting, connecting, managing, and deploying skills within the AI environment. This includes a development experience embedded in EBA itself, complete with automated deployment of change sets, native inclusion of core AI functions and business skills, as well as debugging tools. It is multi-active, multi-regional, employs zero-ops autonomics… EBA is resilient. All of this is available to you immediately after login. EBA already works beautifully on mobile, desktop, native app (Mac), Slack, and Watson Workspace and is ready to engage your customers wherever they are. EBA accommodates your organization’s needs, not the other way around.

### Evolution
Those of you that have worked on intent-based chat bots know how easy it is to get started crafting dialog flows and mapping outcomes to a function. You also know that getting to the next hill of advanced multi-domain AI response/resolution is nearly impossible given the fragile nature of rule-based intent classification. With EBA, you will teach the reasoning machine your business domain through conceptual design, you describe a handful of access patterns, you connect your physical sources that fulfill the conceptual model, and you focus on the outcome for your customer. Humans love to break things… do you want to write a “Choose your own Adventure” single-use novel with fixed transitions or do you want to craft the open experience of the HHGTTG?

## EBA construction ##

EBA borrows from many well-established machine reasoning techniques dating back to the 1980s and later. We’ve attracted a core group of engineers that have taken these concepts and greatly expanded on them through elegant functional design. In fact, EBA’s core was built using Haskell. Domain-agent extensions can be written in any language thanks to IBM Cloud Functions and the integration we’ve crafted to bridge other runtimes with our reasoning core.

Please visit [Programming Watson Assistant](docs/LandingPage.md) for more information about EBA construction and building extensions using our sample agents included in this repository.

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
  
* Grue is coming for you
 
## Prospective features ##

* EBA core reasoning machine
  * Curiosity extension
  * Advanced, automatic anomaly detection
  * Autonomic resolution of business events and derived BPM paths
  * More to come... deciding what to publicly share ;)

## EBA history ##

EBA began in 2016 as a proof of concept. The aim was to create a digital assistant for the business practioner using modern techniques in machine reasoning. We started by describing and emulating the nature of the intern– growing from a helpful admin, not capable of making decisions, into a trusted employee. In order to do this, we needed to erase the typical intent-based pre-crafted predicate rule system and develop a wholly new approach to observation, self-learning, and domain application. We also recognized we needed to divorce the developer from on-going care and feeding of the AI, receiving full instruction through passive and active interaction with the business user. We needed to code a framework for an AI that becomes curious about its business context and seeks to fill gaps in knowledge.

Once we established the domain-agnostic design of the reasoning core, we crafted a semantic ontology layer using a standards-based approach (OWL 2.0). This layer allowed us to craft domain-specific ontological extensions used to teach the reasoning core the language of Commerce, Marketing and Supply Chain (leveraging the business experts within IBM Watson Customer Engagement). This logical layer is the ground truth upon which the reasoning core operates– bridging inbound human crafted questions and action with the subordinate APIs (representing the physical layer of system data and functions).
What we found through these early years of EBA engineering was a profound means with which to deliver total one-to-one application experiences for the business practitioner. Whereas customers may select best of breed vendors to run their operations, EBA functions as the over the top experience linking cross functional processes and data across disparate vendors within various clouds and on-premise systems. Much in the same way retailers attempt to create one-to-one personalized experiences for their customers, EBA is becoming the means to create one-to-one command and control experiences for the business practitioners across any domain– a workspace that morphs itself to accommodate the most important tactical and strategic tasks that the human needs to address based on positive/negative effects on KPI; where KPIs are the rules of engagement governed by the humans upon which the machine will operate.

While we haven’t yet released the “curiosity extension”, we feel we’ve advanced our work enough to share it with you. We have opened up this fully self-contained business user and lab experience, along with a base set of contributing agents. In this way, our colleagues can craft custom AI-driven business experiences for their own use cases right alongside our team. Please explore this public repository for articles and deeper dives on what powers EBA.

## License

EBA is a platform constructed and operated by the [Watson Customer Engagement](https://www.ibm.com/customer-engagement) platform engineering team. This repository hosts documentation and sample configurations that work with the EBA core platform. This content is licensed under the Apache 2.0 license. Full license text is
available in [LICENSE](LICENSE).
