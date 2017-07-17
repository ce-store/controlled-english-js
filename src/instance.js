'use strict'

class Instance {
  constructor (concept, name, vowel) {
    this.instance = { concept, name, vowel }
    this.clauses = []
  }

  is_a (parentConcept) {
    this.clauses.push(`is a ${parentConcept}`)
    return this
  }

  is_an (parentConcept) {
    this.clauses.push(`is an ${parentConcept}`)
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
    let prefix
    if (this.instance.vowel) {
      prefix = `there is an ${this.instance.concept} named \'${this.instance.name}\'`
    } else {
      prefix = `there is a ${this.instance.concept} named \'${this.instance.name}\'`
    }
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
