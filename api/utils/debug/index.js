const noop = require('lodash/noop')
const _debug = require('debug')
const config = require('../../config')

let _logDisabled = false;


function create(ns) {
  const namespace = `${config.namespacePrefix}:${ns}`
  const d = _debug(namespace);

  if (_logDisabled) {
    d.log = noop;
  }
  else {
    // See https://github.com/visionmedia/debug#output-streams
    d.log = console.log.bind(console);
  }

  return {
    ns: namespace,
    log: d,
    error: _debug(namespace)
  }
}

module.exports = {
  create
}