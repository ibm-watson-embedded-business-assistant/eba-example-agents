> _Note: The documentation below explains development of native EBA agents. The foundational principles are the same for hosted agents created in Lab hovewer some details are different. This documentation is work in progress now._

### The Basics

In this section we describe the integration points required to get your first agent up and running.  It is important to understand what each component does and how they operate with one another.

The best way to think about integration is that you are building a skill in such a way as the core reasoning system can understand how to exploit it given end-user questions and context. You are essentially linking in a set of artifacts that describing the skill to the machine. The machine itself doesn't depend on intents or predicate logic, but you do have to provide some basic patterns in order for the machine to begin to use the skills in operation.  

Let's take a look at the integration points. 

#### /core/ontology

The ontology is used to link semantic functions to end user concepts.  See the [Ontology](#Ontology) section below for details.

#### /core/patterns

Patterns are used to help the machine understand the relationship between natural language and concepts used by the skill. See the NL Patterns section below for details.

#### /core/src/Agent

The Agent is where it all comes together, including the concepts, patterns, and functions interpreted by the machine.  See the Semantic API below as well as the source code for the existing Agents to understand how this should be constructed. A great example is /core/src/Agent/Weather.hs

It is also possible to create an Agent using a languge/runtime other than Haskell. Please inquire with the dev team on how we can make this happen. 

#### /core/help

The help file is necessary in order to train your end-human user with some examples of how to exploit your skill. The help file is writte in yaml, and linked in your Agent's source. See examples in the project itself for more information.

#### /core/src/Service

While you can write your skill within the Agent structure, you may also break out your integration by creating a Service that may

#### /ui

In partnership with IBM Design, we have created UI controls and widgets that can be used to present data to the end user using our default React.js based chat environment.  There is also the possibility of using Slack as a UI channel or other channels like SMS as appropriate.  We need to write some more detail here. For now, the Weather.hs Agent is a good start to understand complete end to end delivery and how to wire up UI controls to machine output.

## Advanced Developer Topics

These sections go deeper into the specific APIs that are availble for integrating new skills.

### Semantic API

The Semantic API provides us with a method to tell the agent about all the available actions in a declarative way (to avoid direct interaction with the information space).

In Haskell, the Semantic API is represented by a structure called `SemanticProvider`. This structure consists of two fields:

* `sp_dictionary` - all the available semantic actions - a dictionary (see [HashMap](http://hackage.haskell.org/package/unordered-containers/docs/Data-HashMap-Strict.html)) where the key is the semantic action name and the value is semantic action itself;
* `sp_rewrtrules` - rewriting rules used for meta reasoning.

A semantic action can be built by using a helper called `semanticAction`. This function takes 4 arguments:

```semanticAction :: ByteString -> [InputParam Name] -> Name -> ActionExec Value -> SemanticAPI```

1. String representation (see [ByteString](http://hackage.haskell.org/package/bytestring/docs/Data-ByteString-Char8.html)) of ontology-based constraints for Semantic Action input and output;
2. List of input parameters (`InputParam Name`);
3. Output parameter (`Name`);
4. Semantic Action executor.

where `Name` is the type alias for `ByteString`

Input parameter is an algebraic data type which has three constructors:

1. `Self p` - represents regular input parameters;
2. `Optional p` - represents optional input parameters;
3. `Implicit p` - represents implicit input parameters.

Each constructor takes one string argument `p` which is the input parameter definition.

This definition can be just a concept name like `"com:Category"`. In this case the Semantic Action will expect a concept `com:Category ` with data assigned. This data can be accessed inside the Semantic Action executor using function `paramValue :: FromAny a => Name -> ActionExec a`:

```
semanticAction "" [Self "com:Category"] "com:Products" $ do
	categoryData <- paramValue "com:Category"
	products <- ... get products by category here
	return products
```

this Semantic Action will be triggered once the user asks for products by category, for example:

Q: _show me products for category "Jeans"_

Processing of quoted strings is available out of the box. To get a category by it's name the following Semantic Action can be used:

```
semanticAction "" [Self ":UserString"] "com:Category" $ do
	categoryName <- paramValue ":UserString"
	category <- ... get category by name here
	return category
```

It is possible to wrap an input concept into another concept to clarify the sense of input parameter:

```
semanticAction "" [Self ":WithName(:UserString)"] "com:Category" $ do
	categoryName <- paramValue ":UserString"
	...
```

In this case the Semantic Action will be triggered ONLY when `:UserString` concept has an auxiliary heighbour concept `:WithName` as in questions like:

Q: _show me products for category named "Jeans"_

or

Q: _show me products for category with name "Jeans"_

The auxiliary concepts don't have their own data assigned. So there is no way to access their underlying data inside Semantic Action executor using `paramValue` function!

The auxiliary concept can be marked as optional:
```
semanticAction "" [Self ":WithName?(:UserString)"] "com:Category" $ do
	categoryName <- paramValue ":UserString"
	...
```

This Semantic Action can be triggered in both questions with or without the concept `:WithName`.

The input parameter can be optional:

```
semanticAction "" [Optional "com:Category"] "com:Products" $ do
	mbCategoryData <- paramOptionalValue "com:Category"
	...
```

The function `paramOptionalValue :: FromAny a => Name -> ActionExec (Maybe a)` will return data of the corresponding concept wrapped into [Maybe](http://hackage.haskell.org/package/base/docs/Prelude.html#t:Maybe) type. In this case we can return products for certain category if we have category data and all products.

The input parameter can be implicit:

```
semanticAction "" [Implicit "com:Category"] "com:Products" $ do
	categoryData <- paramValue "com:Category"
	...
```

This Semantic Action can be triggered without the `com:Category` concept in the question thread (an optional parameter) but the agent will still be able to search for the `com:Category` concept data in the context. For example the following scenario will work with implicit `com:Category` parameter:

Q: _show me category "Jeans"_

A: Agent will get the category "Jeans"

Q: _show me products_

A: Agent will get products for category "Jeans"

If no concept found in the context the agent will try to recover this concept data using available Semantic Actions so we will be able to ask questions like _show me products for "Jeans"_.

### NL patterns

In order for the agent to recognize our defined concepts in a natural language means, the corresponding natural language (NL) patterns have to be added to the agent. NL patterns is a plain text file that includes examples of questions where certain words or phrases can be annotated:

```
a {category|com:Category}
the {products|com:Products}
show me {category|com:Category} {named|:WithName} "__"
show me {products|com:Products} for {category|com:Category} "__"
```

Each agent has to manually load the patterns data from file:

```
patterns <- Tagging.readPatterns patternsCache syntaxNet wordNet "patterns/agent_name.txt"
```

and then use this data to annotate input tokens:

```
return Agent {
	...
	agent_tag = \_ -> return . Tagging.annotate patterns,
	...
	}
```

### Ontology

In order for the machine to know that `com:Products` and `com:Category` concepts data can be shown to the user, we have to add the following definition to the ontology file:

```
com:Products subClassOf :Showable .
com:Category subClassOf :Showable .
```

The ontology has to be loaded at agent:

```
ontology <- Ontology.fromFile "ontology/agent_name.ttl"
```

and then added to the agent's ontology field:

```
return Agent {
	...
	agent_ontology = ontology,
	...
	}
```

### UI

For effective UI development you need to switch front end to dev mode otherwise all.js compilation will be required.

1. Run `document.cookie="cca-devmode=true"` in browser console
2. Delete Application Cache in Chrome/Cookies or Fire Fox/Settings/Advanced/Network/Offline Data.
3. Install React devtools. Package is available both for Chrome and FF.
4. In case of Chrome add filesystem folder `ui` to workspace.
5. Refresh browser and check that fine grained sources are used instead of all.js/all.css.
6. Run `make -C ui monitor` in separate terminal console to get live sources compilation when you save a source file in your favorite editor.
7. In Chrome if everything is done properly you can enjoy live React components and CSS styles refresh without entire app reloading (effect React dev tools + adding filesystem folder + running make monitor).


#### Quick react components reference:

EBA UI is implemented using React.js as the foundation library. Official React.js documentation is located [here](https://reactjs.org/docs). All data snippents you can see in conversation, content or graph areas are implemented using correspoding React.js components. We use [CoffeeScript] (http://coffeescript.org/) as the main programming language for JavaScript code and [SCSS](http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html) for CSS styles.

We use auto discovery for data visualization components: give your component a name following the following convention: `<concept namespace>_<concept name><suffix>` where suffix can be one of:

- `Data` – will be used both in conversation area and Knowledge Graph
- `Node` – will be used in Knowledge Graph only
- `Content` – will be used on Content tab and in full screen mode. 

The following properties will be given to your component in `@props`:

- `data` – concept’s data in JSON
- `node` – information space node
- `colors` – d3 ordinal colors you can use as a consistent palette

Naming convention for UI source files: 

- `ui/viz/<concept namespace>/<concept name>.coffee` for JS code
- `ui/viz/<concept namespace>/<concept name>.scss` for CSS code
- reusable controls can be placed to `ui/controls`
- reusable React mixins can be placed to `ui/mixins`

Under any circumstances UI component **must not modify** data passed through `@props`.

[Lodash](https://lodash.com/) library is widely used for data transformations. Consider it if it fits your needs.

It's required to _hardlink_ your UI code to `online.html` now which will trigger it's compilation into `all.js` bundle for deployment. We are going to give more freedom to remote agents so they will be able to host their own UI by themselves.

## Next steps

### polymorphic semantic actions

Polymorfic definitions can be used for both input and output parameters of Semantic Action, instead of concept names. This allows a Semantic Action to be triggered based on a family of concepts. Each polymorfic definition can be additionally controlled by adding constraints as the first argument of `semanticAction` function.

## Try it yourself
[Skills Tutorial](SkillTutorial.md)
