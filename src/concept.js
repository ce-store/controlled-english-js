'use strict'

class Concept {
  constructor (property, value, vowel) {
    this.concept = { property, value, vowel }
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

  has (concept, property) {
    let firstLetter = concept.charAt(0).toUpperCase()
    this.clauses.push(`has the ${concept} ${firstLetter} as ~ ${property} ~`)
    return this
  }

  property (property, concept) {
    let firstLetter = concept.charAt(0).toUpperCase()
    this.clauses.push(`~ ${property} ~ the ${concept} ${firstLetter}`)
    return this
  }

  toString () {
    let firstLetter = this.concept.property.charAt(0).toUpperCase()

    let conceptString
    if (this.concept.vowel) {
      conceptString = `conceptualise an ~ ${this.concept.property} ~ ${firstLetter}`
    } else {
      conceptString = `conceptualise a ~ ${this.concept.property} ~ ${firstLetter}`
    }

    if (this.clauses.length) {
      const clausesString = this.clauses.join(' and ')

      conceptString = `${conceptString} that ${clausesString}`
    }

    return `${conceptString}.`
  }
}

module.exports = Concept
