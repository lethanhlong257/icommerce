# API

## 1. Overview

- API: this service play a main role. Routing the api request. There are 4 endpoint as the requirment:

  > Featch all the products GET /v1/products
  
  >Search product with keyword with criteria name, branch, description, color: GET /v1/products/search?keyword=abc

  > Filter products by branch, description, color, price: GET /v1/products/filter

  > Sort products by name, color, price GET /v1/products/sort

  NOTE: Search endpoint and Filter endpoint call to [search-service](https://github.com/lethanhlong257/icommerce/blob/master/search-service/README.md) to execute search and filter via grpc

Example to use the endpoint:

``` bash
# search product by keywork
curl --location --request GET 'http://localhost:3000/v1/products/search?keyword=red'

# Sort product list by name
curl --location --request GET 'http://localhost:3000/v1/products/sort?sortBy=name&type=desc'

# Filter the products
curl --location --request GET 'http://localhost:3000/v1/products/filter?branch=Apple&minPrice=400&maxPrice=599'

#View al products
curl --location --request GET 'http://localhost:3000/v1/products'
```

## 2. Setup development

- Require setup [Database](https://github.com/lethanhlong257/core-services/blob/18d27c12227f79b496477c529d11dfe4fd4e1c68/README.md) before to launch
- Dependencies: [search-service](https://github.com/lethanhlong257/icommerce/blob/master/search-service/README.md)
- Use node 14.15.1 for launch on MACOS

## 3. Launch in local

- Install dependencies ```npm install```
- Run ```npm run update-sub``` to update the submodule ([schema](https://github.com/lethanhlong257/schema) and [core-service](https://github.com/lethanhlong257/core-services)
- Run ```npm run start``` to launch the api service
- Run ```npm run test``` to execute the test

## 4. Folder structure

```codeblock
api
 |- __tests__ #folder to containn the test code
 |- schema #submodule to contain the proto file for rpc call
 |- src
     |- controller
     |- routes
     |- services
            |- core-services # submodule core-service which contain database lib
     |- utils
          |- debug # debug log code
     |- app.js
     |- index.js
     |- config.js #file config for api service

```
