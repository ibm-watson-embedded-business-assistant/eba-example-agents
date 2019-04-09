Our development lab now features GitHub integration, enabling programmers to work collaboratively in a source controlled environment. Rather than importing, exporting, and storing a local file, developers may now push their saved changes directly into a git repository. To view and to configure this integration, make sure the 'GitHub' tab is selected within the development lab. All changes to your agent are now viewable in a git diff file within this tab. Note that we currently only support proper git integrations from Github. We do not support other source control systems such as Gitlab.

## Semantics
GitHub integration enables the following workflows. 

### Pushing Changes
- Develop: Make changes to your assistant using our development lab.

- Save Changes: Save these changes locally and test them within our chat panel.

- Push: Once you are pleased with your changes you can decide to push them as a single commit to your github repository. Click the 'Publish' button.

    - No Conflicts: The push is successful. You can reference the github repository to see for your latest commit.

    - Conflicts: There is a merge conflict from another contributor's change. You will create a separate branch and submit a pull request. Developers should resolve these conflicts appropriately within GitHub. Note that a bundled approach to git integration is proposed for future development. In this case, each component of the assistant, e.g. action1, will reside in its own file within the repository, e.g. action1.js. In this case, merge conflicts are only possible within the scope of this single action.

### Creating a Pull Request

- Develop: Make changes to your assistant using our development lab.

- Save Changes: Save these changes locally and test them within our chat panel.

- Create Pull Request: If you are pleased with your changes you can create a new branch and a pull request      automatically in EBA. Go to the GitHub Tab in EBA and select to create a Pull Request. Additional
  dialog components will show up asking you  for the new branch name and a commit message.
  Please be aware that the branch name must not have embedded spaces.
  You can also assign optional reviewers. Once you press the Create button, the new branch and pull request will be created in your GitHub Repository.

### Checkout Changes
- Develop: Make changes to your assistant using our development lab.

- Save Changes: Save these changes locally and test them within our chat panel. Press the 'Checkout' button. 

- Checkout: If you are not pleased with your changes you can revert your changes by using the checkout feature. 


## Configuration
To connect your github repository, only two pieces of information are necessary
 1. the path to your yaml configuration on github and 
 2. an access token which enables GitHub to trust our development lab.

The path to your configuration file is really simple to obtain. Simply traverse to the yaml file in GitHub, copy the url, and paste it into 'YAML configuration file' within our lab. As a reference, here is the path to our Walmart sample: `https://github.com/ibm-watson-embedded-business-assistant/eba-example-agents/blob/master/samples/walmart.yaml`.

To generate an access token, follow these steps.

- Login to your GitHub account.

- Navigate to 'Settings' using the avatar drop down in the top right corner.

- Navigate to 'Developer Settings'.

- Navigate to 'Personal access tokens'.

- Click 'generate new token'.

- Add a description and select 'repo' as the scope for the token.

- Click 'Generate token'.

- Copy and safely store this token for future reference in a place of your choosing.

- Paste this token into the 'Access Token' field within the development lab.
