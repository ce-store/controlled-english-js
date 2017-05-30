'use strict'

class Query {
  constructor (name) {
    this.name = name
    this.variables = []
    this.clauses = []
  }

  there (concept, variable) {
    this.clauses.push(`there is a ${concept} named ${variable}`)
    return this
  }

  the (...params) {
    if (params.length === 3) {
      this.clauses.push(`the ${params[0]} ${params[1]} is a ${params[2]}`)
    } else if (params.length === 5) {
      this.clauses.push(`the ${params[0]} ${params[1]} ${params[2]} the ${params[3]} ${params[4]}`)
    } else {
      throw new Exception('Unknown number of arguments, must be three or five.')
    }
    return this
  }

  for (...variables) {
    this.variables = variables
    return this
  }

  toString () {
    let variables = this.variables.reduce((result, current, index, arr) => {
      if (!result) return current
      if (index === arr.length - 1) return `${result} and ${current}`

      return `${result}, ${current}`
    }, '')

    let clauses = this.clauses
      .map(clause => `  ( ${clause} )`)
      .join(' and\n')

    return `[ ${this.name} ]\nfor which ${variables} is it true that\n${clauses}\n.`
  }
}

module.exports = Query
