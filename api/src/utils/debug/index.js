import noop from 'lodash/noop';
import _debug from 'debug';
import * as config from '../../config'

let _logDisabled = false;


export function create(ns) {
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

