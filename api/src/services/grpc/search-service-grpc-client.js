import {searchService} from '../../../schema/config'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import BPromise from 'bluebird'
import {create} from '../../utils/debug'

const debug = create('grpc-search-client')

class SearchServiceRpcClient {
  constructor() {
    const servicePath = `${__dirname}/../../../schema/src/rpc/search-service/search-service.proto`

    this._searchClient = null
    this._grpcPort = searchService.port,
    this._grpcHost = searchService.host,
    this._packageDefinition = protoLoader.loadSync(servicePath)
    this._searchServiceRpcClient = grpc.loadPackageDefinition(this._packageDefinition).icommerce.SearchServiceRpc
  }

  async init() {
    const serviceAddress = this._grpcHost
    const servicePort = this._grpcPort

    const rawSearchClient = new this._searchServiceRpcClient(
      `${serviceAddress}:${servicePort}`, grpc.credentials.createInsecure())

      this._searchClient = BPromise.promisifyAll(rawSearchClient)
  }

  async filterProduct(options = {}) {
    if (!this._searchClient) {
      throw new Error('No gRPC client found')
    }

    try {
      const searchResult = await this._searchClient.filterProductAsync(options)

      return searchResult
    }
    catch (error) {
      debug.error(
        'Failed to search', error)
      throw error
    }
  }

  async searchProduct({keyword = ''}) {
    if (!this._searchClient) {
      throw new Error('No gRPC client found')
    }

    try {
      const searchResult = await this._searchClient.searchProductAsync({keyword})

      return searchResult
    }
    catch (error) {
      debug.error(
        'Failed to search', error)
      throw error
    }
  }
}

export default new SearchServiceRpcClient()