'use strict'

const stateSymbol = Symbol('state')

const generateStatePropertiesCE = (state, properties) => {
  switch (state.current) {
    case States.NEW_INSTANCE:
      return [properties[0], 'named', properties[1]]
    case States.INSTANCE_PROP:
      return [`'${properties[0]}'`, 'as', properties[1]]
    case States.EXTEND_INSTANCE:
      return [...properties]
    case States.PROPERTY_NAME:
    case States.CONCEPT_VALUE:
      return ['the', ...properties]
  }
}

const States = {
  START: Symbol('START'),
  NEW_INSTANCE: Symbol('NEW_INSTANCE'),
  EXTEND_INSTANCE: Symbol('EXTEND_INSTANCE'),
  INSTANCE_PROP: Symbol('INSTANCE_PROP'),
  PROPERTY_NAME: Symbol('PROPERTY_NAME'),
  CONCEPT_VALUE: Symbol('CONCEPT_VALUE')
}

const StateSteps = {}
StateSteps[States.NEW_INSTANCE] = ['there', 'is', 'a']
StateSteps[States.EXTEND_INSTANCE] = ['the']
StateSteps[States.INSTANCE_PROP] = ['has']
StateSteps[States.PROPERTY_NAME] = ['is']
StateSteps[States.CONCEPT_VALUE] = ['of']

const StartStates = [States.NEW_INSTANCE, States.EXTEND_INSTANCE]
const InstancePropStates = [States.INSTANCE_PROP, States.PROPERTY_NAME]

const isNextStateStep = (word, steps) => steps.length && steps[0] === word

const findNextStateForWord = (states, word) => {
  return states.find(state => isNextStateStep(word, StateSteps[state]))
}

const moveToNextState = (state, word, nextStates) => {
  const nextState = findNextStateForWord(nextStates, word)
  if (!nextState) {
    throw new Error('Invalid controlled english sentence. Sentence must does not start with valid word.')
  }

  state.current = nextState
  state.remaining_steps = StateSteps[nextState]
}

const updateState = (word, state) => {
  switch (state.current) {
    case States.START:
      moveToNextState(state, word, StartStates)
      break
    case States.NEW_INSTANCE:
      if (!state.remaining_steps.length) {
        moveToNextState(state, word, InstancePropStates)
        state.sentence.push('that')
      }
      break
    case States.EXTEND_INSTANCE:
      if (!state.remaining_steps.length) {
        moveToNextState(state, word, InstancePropStates)
      }
      break
    case States.PROPERTY_NAME:
      if (!state.remaining_steps.length) {
        moveToNextState(state, word, [States.CONCEPT_VALUE])
      }
      break
    case States.CONCEPT_VALUE:
    case States.INSTANCE_PROP:
      if (!state.remaining_steps.length) {
        moveToNextState(state, word, InstancePropStates)
        state.sentence.push('and')
      }
      break
    default:
  }
}

const checkNextStepForState = (word, state) => {
  if (!isNextStateStep(word, state.remaining_steps)) {
    throw new Error(`Invalid controlled english sentence.`)
  }
}

const process_word = (word, state) => {
  updateState(word, state)
  checkNextStepForState(word, state)
  state.sentence.push(word)
  state.remaining_steps = state.remaining_steps.slice(1)
}

class Sentence {
  constructor () {
    this[stateSymbol] = {
      current: States.START,
      remaining_steps: [],
      sentence: []
    }

    const proxy = new Proxy(this, {
      get: function (target, property, receiver) {
        if (property in target) {
          return target[property]
        }

        process_word(property, target[stateSymbol])
        if (target.hasFinishedStateSteps()) {
          return new Proxy(() => {}, {
            apply: function (_target, thisArg, argumentsLists) {
              const propertyValues = generateStatePropertiesCE(target[stateSymbol], argumentsLists)
              target[stateSymbol].sentence.push(...propertyValues)
              return proxy
            }
          })
        }
        return proxy
      }
    })
    return proxy
  }

  toString () {
    return `${this[stateSymbol].sentence.join(' ')}.`
  }

  hasFinishedStateSteps () {
    return !this[stateSymbol].remaining_steps.length
  }
}

module.exports = Sentence
