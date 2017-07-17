'use strict'

class Query {
  constructor (name) {
    this.name = name
    this.variables = []
    this.clauses = []
  }

  for (...variables) {
    this.variables = variables
    return this
  }

  there_is_a (concept, variable) {
    this.clauses.push(`there is a ${concept} named ${variable}`)
    return this
  }

  there_is_an (concept, variable) {
    this.clauses.push(`there is an ${concept} named ${variable}`)
    return this
  }

  is_a (concept, variable, parentConcept) {
    this.clauses.push(`the ${concept} ${variable} is a ${parentConcept}`)
    return this
  }

  is_an (concept, variable, parentConcept) {
    this.clauses.push(`the ${concept} ${variable} is an ${parentConcept}`)
    return this
  }

  has (concept, variable1, property_concept, variable2, property) {
    this.clauses.push(`the ${concept} ${variable1} has the ${property_concept} ${variable2} as ${property}`)
    return this
  }

  property (concept, variable1, property, property_concept, variable2) {
    this.clauses.push(`the ${concept} ${variable1} ${property} the ${property_concept} ${variable2}`)
    return this
  }

  toString () {
    let query = `[ ${this.name} ]\n`

    if (this.variables.length) {
      let variables = this.variables.reduce((result, current, index, arr) => {
        if (!result) return current
        if (index === arr.length - 1) return `${result} and ${current}`

        return `${result}, ${current}`
      }, '')

      query += `for which ${variables} is it true that\n`
    }

    if (this.clauses.length) {
      let clauses = this.clauses
        .map(clause => `  ( ${clause} )`)
        .join(' and\n')

      query += `${clauses}\n.`
    }

    return query
  }
}

module.exports = Query
