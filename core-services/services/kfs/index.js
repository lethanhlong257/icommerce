import uuid from 'node-uuid'
import path from 'path'
import BPromise from 'bluebird'
import del from 'del'

const fs = BPromise.promisifyAll(require('fs'))

/**
 * Loads a `dir` excepts for those in the `excepts` array.
 * @param {String} dir - the directory to load.
 * @param {Array[String]} excepts (optional) - the array of paths to filter.
 * @param {Array[Object]} args (optional) - invoke the returned function with these args.
 * @return {Array[Object]} the results of the `require` operation.
 */
 export function requireDir(dir, excepts = [], ...args) {
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === '.js' && !excepts.includes(file))
    .map((file) => {
      let module = require(path.join(dir, file))
      if (args.length) {
        module = module(...args)
      }

      module.sourceFilename = module.sourceFilename || path.parse(file).name

      return module
    })
}
