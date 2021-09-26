import * as config from './config'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {create} from './utils/debug'
import GRPCServer from './server/grpc'
import GRPCService from './server/grpc/service'
import {searchService} from '../schema/config'
import searchingServiceImplementation from './services/search'

const debug = create('init-sercive')

function reportConfigVars() {
  debug.log('App runs with below environment parameters')
  for (const k of Object.keys(config)) {
    // eslint-disable-next-line import/namespace
    let value = config[k]

    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    // eslint-disable-next-line import/namespace
    debug.log(`   - ${k} = ${config[k]}`)
  }
}

async function startGRPCServer() {
  const servicePath = `${__dirname}/../schema/src/rpc/search-service/search-service.proto`
  const packageDefinition = protoLoader.loadSync(servicePath)
  const SearchServiceRpcService = grpc.loadPackageDefinition(packageDefinition)

  try {
    await new GRPCServer({
      port: searchService.port,
      host: searchService.host,
      services: [
        new GRPCService(SearchServiceRpcService.icommerce.SearchServiceRpc.service,
          searchingServiceImplementation)
      ]
    }).start()
  }
  catch (error) {
    console.log(`Cannot start server at port ${searchService.port}`, error)
    return process.exit(1)
  }
}

async function main() {
  reportConfigVars()
  await startGRPCServer()
}

main()
