## Multi-user integration

In [web integration](./Web.md), we outlined the steps required for integrating EBA as an iframe into an existing host application. Following those steps developers will be able to get EBA running inside of their application with a few lines of code. In fact, by logging into EBA using any of our standard supported identities, developers may even begin to develop and show case any personal agents within their host system. In order to complete the integration; however, their must be an establishment of trust between the host application and EBA.  


Once this trust has been established, integrating partners can enjoy the following benefits:

* all target end users can immediately access EBA in the host application (SSO experience)
* partners will have a controlled environment of agents, exposing any designated set of shared agents to their users
* partners will have a designated set of editors who will manage their agent environment


There are two popular options we may consider in order to establish trust. The first option to is use a signed JWT access token, and the second option is to leverage any existing OAuth service. Note that the partner enablement is currently a manual effort, but it will be automated through a UI in the near future. We encourage integrating partners to make their integration requests at [EBA platform](https://github.ibm.com/WCE-Platform/EBA-Platform/issues/new?assignees=&labels=&template=custom.md&title=).


### JWT Integration


The most straightforward path to integration is to use JWT tokens. [JSON Web Token](https://jwt.io) is a common standard for communicating claims between two parties. JWT can be signed and verified using a set of private and public RSA keys to ensure that data transferred from one party to another can be trusted. The JWT claims should contain an iss field and a sub field, where the iss field represents the domain name of the product integrating with EBA, e.g. https://my-host-application.com, and the sub claim represents the user identity, e.g. kevin@company.com. Note that the iss and the sub together should form a globally unique identifier. Having these signed JWT claims, EBA will be in a position to decode the token and successfully identity and create a session for you a given user.
 
Additionally, EBA will require a set of sub claims to be identified as editors. These are users with special privileges to develop and change agents within EBA. Every user will have the ability to read and use an agent, but only editors can edit agents. 


Lastly, the integration partner should also determine which set of core agents they would prefer to include in their environment. EBA will provision this set of agents, after which the editors can control them.
 
Here is an outline of the steps required:
 
* Create a pair of RSA 256 keys. Secure your private key and do not share it with anyone. Send the public key to EBA team. 
* In your host application, construct your JWT claims and sign them using your RSA private key. Recall that the claims must include the iss and sub fields. In IBM_EBA_Config, pass in this token in the field named ‘access_token’. Additionally, for better loading performance, you may include the 'loading_delay' field as described below: 
```
                            IBM_EBA_CONFIG = {
                                access_token: <your-token>,
                                loading_delay: 1000,
                                // any additional configuration fields...
                              }
```
* Provide the issuer domain name of your host application, e.g. https://my-application-prod.com
* Provide a list of editors as well as the list of shared agents you would like loaded into your environment.


_Note: an integrating partner may wish to include details for as many environments as they wish to integrate with--testing, staging, production, etc._


### OAuth Integration

It is harder to provide a detailed outline for OAuth integration as it depends upon the particular service being used to integrate. Generally speaking, OAuth allows EBA to use a client's existing auth service in order to be granted permission to that client's data. If the OAuth flow is successful, EBA will obtain an access_token from the OAuth service and create a session for the user and being granted privileges to request data on behalf of a user. For instance, EBA uses OAuth for its integration with Slack and Github. 

Speaking generally, in order to implement an OAuth flow, EBA will need to obtain an authorization and token endpoints from the client service. Additionally, it will need a client secret and client id, as well as a OAuth scope. Such details may vary depending on the service. Having this information in place, EBA team will implement an OAuth flow, where users on a host site can login to EBA.
