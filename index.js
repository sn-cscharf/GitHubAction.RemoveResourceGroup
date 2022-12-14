const core = require('@actions/core');
const resources = require("@azure/arm-resources");
const identity = require("@azure/identity");

async function removeResourceGroup() {
  try {
    const name = core.getInput("name", { required: true, trimWhitespace: true });

    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
    const credential = new identity.DefaultAzureCredential();
    const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);

    const exists = (await resourcesClient.resourceGroups.checkExistence(name)).body;

    if (exists) {
      await resourcesClient.resourceGroups.beginDeleteAndWait(name);
      core.info(`The resource group ${name} was removed successfully.`);
    }
    else {
      core.info(`The resource group ${name} does not exist.`);
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

removeResourceGroup();