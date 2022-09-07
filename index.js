const core = require('@actions/core');
const resources = require("@azure/arm-resources");
const identity = require("@azure/identity");

(async () => {
  try {
    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
    const credential = new identity.DefaultAzureCredential();
    const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);
  
    const name = core.getInput("name", { required: true, trimWhitespace: true });

    await resourcesClient.resourceGroups.checkExistence(name)
    .then(async () => {
      await resourcesClient.resourceGroups.beginDeleteAndWait(name);
      core.info(`The resource group ${name} was removed successfully.`);
    },
      core.info(`The resource group ${name} does not exist.`)
    );
  } 
  catch (error) {
    core.setFailed(error.message);
  }
})();