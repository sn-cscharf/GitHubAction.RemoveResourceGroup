const core = require('@actions/core');
const resources = require("@azure/arm-resources");
const identity = require("@azure/identity");

try {
  const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
  const credential = new identity.DefaultAzureCredential();
  const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);

  const name = core.getInput("name", { required: true, trimWhitespace: true });

  resourcesClient.resourceGroups.checkExistence(name)
    .then(result => {
      
      core.info(JSON.stringify(result));
      
      if (result == true) {
        resourcesClient.resourceGroups.beginDeleteAndWait(name).then(
          core.info(`The resource group ${name} was removed successfully.`));
      }
      else {
          core.info(`The resource group ${name} does not exist.`);
      }
    });
}
catch (error) {
  core.setFailed(error.message);
}