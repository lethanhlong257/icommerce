const express = require('express')

class BaseCtrl {
  constructor() {
    this.router = new Router();
    for (const {method, url, middleware, fnName} of this.$routes) {
      this.router[method](url, ...middleware, this[fnName].bind(this))
    }
  }
}