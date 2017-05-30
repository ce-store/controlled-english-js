'use strict'

import test from 'ava'
import CE from '../index.js'

test('can create new instances', t => {
  let sentences = new CE.Sentences()

  sentences
    .there_is_a('man', 'John')

  t.is(sentences.toString(), 'there is a man named John.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .has('53', 'age')

  t.is(sentences.toString(), 'there is a man named John that has \'53\' as age.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is('sibling', 'person', 'Jill')

  t.is(sentences.toString(), 'there is a man named John that is the sibling of the person Jill.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is('sibling', 'person', 'Jill')
    .has('53', 'age')
    .is('brother', 'person', 'James')
    .has('united', 'team')

  t.is(sentences.toString(), 'there is a man named John that is the sibling of the person Jill and has \'53\' as age and is the brother of the person James and has \'united\' as team.')
})

test('can extend instances', t => {
  let sentences = new CE.Sentences()
  sentences
    .the('man', 'John')

  t.is(sentences.toString(), 'the man John.')

  sentences = new CE.Sentences()
  sentences
    .the('man', 'John')
    .is('sibling', 'person', 'Jill')
    .has('53', 'age')
    .is('brother', 'person', 'James')
    .has('united', 'team')

  t.is(sentences.toString(), 'the man John is the sibling of the person Jill and has \'53\' as age and is the brother of the person James and has \'united\' as team.')
})

test('can define concepts', t => {
  let sentences = new CE.Sentences()

  sentences
    .concept('man', 'M')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M.')

  sentences = new CE.Sentences()
  sentences
    .concept('man', 'M')
    .is('person')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that is a person.')

  sentences = new CE.Sentences()
  sentences
    .concept('man', 'M')
    .value('V', 'age')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that has the value V as ~ age ~.')

  sentences = new CE.Sentences()
  sentences
    .concept('man', 'M')
    .property('is the brother of', 'person', 'P1')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that ~ is the brother of ~ the person P1.')

  sentences = new CE.Sentences()
  sentences
    .concept('man', 'M')
    .is('person')
    .value('V', 'age')
    .property('is the brother of', 'person', 'P1')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that is a person and has the value V as ~ age ~ and ~ is the brother of ~ the person P1.')
})

test('can construct multiple sentencess', t => {
  let sentences = new CE.Sentences()

  sentences
    .concept('man', 'M')

  sentences
    .there_is_a('man', 'John')

  sentences
    .the('man', 'John')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M. there is a man named John. the man John.')
})
