'use strict'

class Concept {
  constructor (property, value) {
    this.concept = { property, value }
    this.clauses = []
  }

  is (parentConcept) {
    this.clauses.push(`is a ${parentConcept}`)
    return this
  }

  value (letter, property) {
    this.clauses.push(`has the value ${letter} as ~ ${property} ~`)
    return this
  }

  property (relationship, name, letter) {
    this.clauses.push(`~ ${relationship} ~ the ${name} ${letter}`)
    return this
  }

  toString () {
    let conceptString = `conceptualise a ~ ${this.concept.property} ~ ${this.concept.value}`

    if (this.clauses.length) {
      const clausesString = this.clauses.join(' and ')

      conceptString = `${conceptString} that ${clausesString}`
    }

    return `${conceptString}.`
  }
}

module.exports = Concept
