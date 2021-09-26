import BPromise from 'bluebird'
import {Server, ServerCredentials} from '@grpc/grpc-js'

export default class GRPCServer {
  constructor({
    host,
    port,
    services = []
  } = {}) {
    this._server = new Server()

    if (services.length) {
      services.forEach(({definition, implementation}) => {
        this._server.addService(definition, implementation)
      })
    }

    this._host = host
    this._port = port
  }

  start() {
    return new BPromise((resolve, reject) => {
      this._server.bindAsync(`${this._host}:${this._port}`,
        ServerCredentials.createInsecure(), (error) => {
          if (error) {
            return reject(error)
          }
  
          resolve(this._server.start())
        })
    })
  }
}
