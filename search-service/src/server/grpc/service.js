import merge from 'lodash/merge'
import {status} from '@grpc/grpc-js'
import {create} from '../../utils/debug'

const debug = create('GRPCService')

export default class GRPCService {
  constructor(definition, implementation = {}) {
    this._definition = definition
    this._implementation = merge(
      ...Object.keys(implementation)
        .map((functionKey) => {
          const functionImplementation = implementation[functionKey]
          return {
            [functionKey]: async function (call, callback) {
              try {
                debug.log(functionKey, 'Processing request ...')
                const response = await functionImplementation(call.request, {
                  logMessage: (...messages) => debug.log(functionKey, ...messages),
                  logError: (...errors) => debug.error(functionKey, ...errors)
                })
                callback(null, response)
              }
              catch (error) {
                debug.error(functionKey, 'Error while processing request. ', error)
                const errorObj = {
                  code: status.INTERNAL,
                  message: error.message || error
                }

                callback(errorObj)
              }
            }
          }
        })
    )
  }

  get definition() {
    return this._definition
  }

  get implementation() {
    return this._implementation
  }
}
