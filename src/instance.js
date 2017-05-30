'use strict'

class Instance {
  constructor (concept, name) {
    this.instance = { concept, name}
    this.clauses = []
  }

  is (name, concept, value) {
    this.clauses.push(`is the ${name} of the ${concept} ${value}`)
    return this
  }

  has (property, concept) {
    this.clauses.push(`has \'${property}\' as ${concept}`)
    return this
  }

  has_clauses () {
    return !!this.clauses.length
  }

  prefix () {
    let prefix = `there is a ${this.instance.concept} named ${this.instance.name}`
    return this.has_clauses() ? `${prefix} that` : prefix
  }

  toString () {
    let conceptString = this.prefix()

    if (this.has_clauses()) {
      const clausesString = this.clauses.join(' and ')

      conceptString = `${conceptString} ${clausesString}`
    }

    return `${conceptString}.`
  }
}

module.exports = Instance
