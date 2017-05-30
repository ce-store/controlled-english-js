'use strict'

const sentencesSymbol = Symbol('sentences')

const Concept = require('./concept')
const Instance = require('./instance')
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

  concept (property, value) {
    return this.sentence(new Concept(property, value))
  }

  there_is_a (concept, instance) {
    return this.sentence(new Instance(concept, instance))
  }

  the (concept, instance) {
    return this.sentence(new ExtendInstance(concept, instance))
  }

  sentence (klass) {
    this[sentencesSymbol].push(klass)
    return klass
  }
}

module.exports = Sentences
