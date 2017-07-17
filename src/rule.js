'use strict'

class Rule {
  constructor (name) {
    this.name = name
    this.predicates = []
    this.statements = []
    this.called_if = false
    this.called_then = false
  }

  if () {
    this.called_if = true
    return this
  }

  then () {
    this.called_then = true
    return this
  }

  there_is_a (concept, variable) {
    this.add_clause(`there is a ${concept} named '${variable}'`)
    return this
  }

  there_is_an (concept, variable) {
    this.add_clause(`there is a ${concept} named '${variable}'`)
    return this
  }

  is_a (concept, variable, parentConcept) {
    this.add_clause(`the ${concept} ${variable} is a ${parentConcept}`)
    return this
  }

  is_an (concept, variable, parentConcept) {
    this.add_clause(`the ${concept} ${variable} is an ${parentConcept}`)
    return this
  }

  has (concept, variable1, property_concept, variable2, property) {
    this.add_clause(`the ${concept} ${variable1} has the ${property_concept} ${variable2} as ${property}`)
    return this
  }

  has_no (concept, variable1, property_concept, variable2, property) {
    this.add_clause(`the ${concept} ${variable1} has no ${property_concept} ${variable2} as ${property}`)
    return this
  }

  property (concept, variable1, property, property_concept, variable2) {
    this.add_clause(`the ${concept} ${variable1} ${property} the ${property_concept} ${variable2}`)
    return this
  }

  property_no (concept, variable1, property, property_concept, variable2) {
    this.add_clause(`the ${concept} ${variable1} ${property} no ${property_concept} ${variable2}`)
    return this
  }

  add_clause (clause) {
    if (this.called_if) {
      if (this.called_then) {
        this.statements.push(clause)
      } else {
        this.predicates.push(clause)
      }
    } else {
      throw new Error('Need to call .if() method before adding clauses.')
    }
  }

  toString () {
    let rule = `[ ${this.name} ]\n`

    if (this.called_if) {
      rule += 'if\n'
    }

    if (this.predicates.length) {
      let predicates = this.predicates
        .map(clause => `  ( ${clause} )`)
        .join(' and\n')

      rule += `${predicates}\n`
    }

    if (this.called_then) {
      rule += 'then\n'
    }

    if (this.statements.length) {
      let statements = this.statements
        .map(clause => `  ( ${clause} )`)
        .join(' and\n')

      rule += `${statements}\n.`
    }

    return rule
  }
}

module.exports = Rule
