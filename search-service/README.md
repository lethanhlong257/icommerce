# Search service

## 1. Overview

This is the gRPC server.
The current services:

- Search service
- Filter service

## 2. Setup development

- Require setup [Database](https://github.com/lethanhlong257/core-services/blob/18d27c12227f79b496477c529d11dfe4fd4e1c68/README.md) before to launch
- Use node 14.15.1 for launch on MACOS

## 3. Launch in local

- Install dependencies ```npm install```
- Run ```npm run update-sub``` to update the submodule ([schema](https://github.com/lethanhlong257/schema/blob/b99d288a9ded25d3ffae7f4376eb0bb0907254d9/README.md) and [core-service](https://github.com/lethanhlong257/core-services/blob/18d27c12227f79b496477c529d11dfe4fd4e1c68/README.md))
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
