# Search service

## 1. Overview

This is the gRPC server.
The current services:

- Search service
- Filter service

## 2. Setup development

- Require setup [Database](https://github.com/lethanhlong257/core-services) before to launch
- Use node 14.15.1 for launch on MACOS

## 3. Launch in local

- Install dependencies ```npm install```
- Run ```npm run update-sub``` to update the submodule ([schema](https://github.com/lethanhlong257/schema) and [core-service](https://github.com/lethanhlong257/core-services))
- Run ```npm run start``` to launch the api service

## 4. Folder structure

```codeblock
search-service
    |- schema #submodule to contain the proto file for rpc call
    |- src
        |- server   # code to create rpc server
        |- services   #code to create new services and add to rpc
        |- utils
              |- debug # debug log code
        |- index.js
        |- config.js #file config for search-service service

```
