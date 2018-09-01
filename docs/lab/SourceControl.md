Our development lab now features Github integration, enabling programmers to work collobartively in a source controlled enviornment. Rather than importing, exporting, and storing a local file, developers may now push their saved changes directly a git repository. To view and to configure this integration, make sure the 'Github' tab is selected within the development lab. All changes to your agent are now viewable in a git diff file within this tab.

### Semantics
Github integration enables the following workflows. 

#### Pushing Changes
- Devlop: Make changes to your assistant using our development lab.

- Save Changes: Save these changes locally and test them within our chat panel.

- Push: You are pleased with your changes, so you decide to push them as a single commit to your github repository. Click the 'Publish' button.

    - No Conflicts: The push is successful. You can reference the github repository to see for your latest commit.

    - Conflicts: There is a merge conflict from another contributor's change. You will create a seperate branch and submit a pull request. Developers should resolve these conflicts appropriately within Github. Note that a bundled approach to git integration is proposed for future development. In this case, each component of the assistant, e.g. action1, will reside in its own file within the repository, e.g. action1.js. In this case, merge conflicts are only possible within the scope of this single action.


#### Checkout Changes
- Devlop: Make changes to your assistant using our development lab.

- Save Changes: Save these changes locally and test them within our chat panel. Press the 'Checkout' button. 

- Checkout: You are not pleased with your changes, so you checkout and start from your branch's HEAD. 


### Configuration
To connect your github repository, only two pieces of information are necessary, viz. the path to your yaml configuration on github and an access token which enables Github to trust our development lab.

The path to your configuration file is really simple to obtain. Simply traverse to the yaml file in Github, copy the url, and paste it into 'YAML configuration file' within our lab. As a reference, here is the path to our Walmart sample: https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/blob/master/samples/walmart.yaml.

To generate an access token, follow these steps.

- Login to your Github account.

- Navigate to 'Settings' using the avatar drop down in the top right corner.

- Navigate to 'Developer Settings'.

- Navigate to 'Personal access tokens'.

- Click 'generate new token'.

- Add a description and select 'repo' as the scope for the token.

- Click 'Generate token'.

- Copy and safely store this token for future reference in a place of your choosing.

- Paste this token into the 'Access Token' field within the development lab.
