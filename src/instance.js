'use strict'

class Instance {
  constructor (concept, name) {
    this.instance = { concept, name}
    this.clauses = []
  }

  is (name, concept, value) {
    if (concept && value) {
      this.clauses.push(`is the ${name} of the ${concept} ${value}`)
    } else {
      this.clauses.push(`is a ${name}`)
    }
    return this
  }

  has (concept, property, name) {
    if (concept) {
      this.clauses.push(`has the ${concept} \'${property}\' as ${name}`)
    } else {
      this.clauses.push(`has \'${property}\' as ${name}`)
    }
    return this
  }

  property (property, concept, value) {
    if (concept) {
      this.clauses.push(`${property} the ${concept} \'${value}\'`)
    } else {
      this.clauses.push(`${property} \'${value}\'`)
    }
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
