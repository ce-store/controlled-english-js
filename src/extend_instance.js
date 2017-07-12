'use strict'

const Instance = require('./instance')

class ExtendInstance extends Instance {
  prefix () {
    return `the ${this.instance.concept} \'${this.instance.name}\'`
  }
}

module.exports = ExtendInstance
