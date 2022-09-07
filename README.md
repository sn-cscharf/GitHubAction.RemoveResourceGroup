# GitHub Action Create Resource Group
```yml
name: Remove Resource Group GitHub Action Example
on:
  push:
    branches:
      - $default-branch
jobs:
  provision:
    runs-on: ubuntu-latest
    env:
      AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
      AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
      AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
      AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
    steps:
    - name: Remove Resource Group
      uses: sn-cscharf/GitHubAction.RemoveResourceGroup@v1.0.0
      with:
        name: ${{ github.ref_name }}
```

# Inputs
## Environment Variables
Obtain following environment variables by following this link: [Authenticate to Azure using environment variables](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/resourcemanager/Azure.ResourceManager/docs/AuthUsingEnvironmentVariables.md)

Name | Required
:-   | :-:
AZURE_CLIENT_ID | Yes
AZURE_CLIENT_SECRET | Yes
AZURE_TENANT_ID | Yes
AZURE_SUBSCRIPTION_ID | Yes

Please register secrets named accordingly to use in env element:
```yml
env:
  AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
  AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
  AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
  AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```
## Step Variables

Name | Required | Description
:-   | :-: | :-
name | Yes | The name of the resource group to remove e.g. APPNAME-RESOURCE-STAGING.

Use in with element:
```yml
with:
  name: APP-GROUP-DEV
```