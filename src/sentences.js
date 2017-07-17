'use strict'

const sentencesSymbol = Symbol('sentences')

const Concept = require('./concept')
const Instance = require('./instance')
const Query = require('./query')
const Rule = require('./rule')
const ExtendInstance = require('./extend_instance')

class Sentences {
  constructor () {
    this[sentencesSymbol] = []
  }

  toString () {
    return this[sentencesSymbol]
      .map(sentence => sentence.toString())
      .join(' ')
  }

  conceptualise_a (property, value) {
    return this.sentence(new Concept(property, value))
  }

  conceptualise_an (property, value) {
    return this.sentence(new Concept(property, value, true))
  }

  there_is_a (concept, instance) {
    return this.sentence(new Instance(concept, instance))
  }

  there_is_an (concept, instance) {
    return this.sentence(new Instance(concept, instance, true))
  }

  the (concept, instance) {
    return this.sentence(new ExtendInstance(concept, instance))
  }

  query (name) {
    return this.sentence(new Query(name))
  }

  rule (name) {
    return this.sentence(new Rule(name))
  }

  sentence (klass) {
    this[sentencesSymbol].push(klass)
    return klass
  }
}

module.exports = Sentences
