'use strict'

class Rule {
  constructor (name) {
    this.name = name
    this.predicates = []
    this.statements = []
    this.called_then = false
  }

  there (concept, variable) {
    this.add_clause(`there is a ${concept} named ${variable}`)
    return this
  }

  the (...params) {
    if (params.length === 3) {
      this.add_clause(`the ${params[0]} ${params[1]} is a ${params[2]}`)
    } else if (params.length === 5) {
      this.add_clause(`the ${params[0]} ${params[1]} ${params[2]} the ${params[3]} ${params[4]}`)
    } else {
      throw new Exception('Unknown number of arguments, must be three or five.')
    }
    return this
  }

  then () {
    this.called_then = true
    return this
  }

  add_clause (clause) {
    if (this.called_then) {
      this.statements.push(clause)
    } else {
      this.predicates.push(clause)
    }
  }

  toString () {
    let predicates = this.predicates
      .map(clause => `  ( ${clause} )`)
      .join(' and\n')

    let statements = this.statements
      .map(clause => `  ( ${clause} )`)
      .join(' and\n')

    return `[ ${this.name} ]\nif\n${predicates}\nthen\n${statements}\n.`
  }
}

module.exports = Rule
