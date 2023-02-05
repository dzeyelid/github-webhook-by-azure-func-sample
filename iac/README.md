# Azure リソース構築

### デバッグ手順

```bash
WORKLOAD="{ワークロードを示す文字列}"
LOCATION="japaneast"

RESOURCE_GROUP_NAME="rg-${WORKLOAD}"

az login
az group create --name ${RESOURCE_GROUP_NAME} --location ${LOCATION}
az deployment group create \
  --resource-group ${RESOURCE_GROUP_NAME} \
  --template-file ./iac/main.bicep \
  --parameters \
    workload=${WORKLOAD} \
    location=${LOCATION}
```

### ARMテンプレートファイルの生成

```bash
az bicep build --file ./iac/main.bicep --outfile ./iac/main.json
```