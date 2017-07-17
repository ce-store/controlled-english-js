'use strict'

import test from 'ava'
import CE from '../index.js'

test('can define concepts', t => {
  let sentences = new CE.Sentences()
  sentences
    .conceptualise_a('man')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M.')

  sentences = new CE.Sentences()
  sentences
    .conceptualise_an('ant')

  t.is(sentences.toString(), 'conceptualise an ~ ant ~ A.')

  sentences = new CE.Sentences()
  sentences
    .conceptualise_a('man')
    .is_a('person')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that is a person.')

  sentences = new CE.Sentences()
  sentences
    .conceptualise_a('man')
    .is_an('ant')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that is an ant.')

  sentences = new CE.Sentences()
  sentences
    .conceptualise_a('man')
    .has('value', 'age')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that has the value V as ~ age ~.')

  sentences = new CE.Sentences()
  sentences
    .conceptualise_a('man')
    .has('colour', 'hair colour')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that has the colour C as ~ hair colour ~.')

  sentences = new CE.Sentences()
  sentences
    .conceptualise_a('man')
    .property('is the brother of', 'person')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that ~ is the brother of ~ the person P.')

  sentences = new CE.Sentences()
  sentences
    .conceptualise_a('man')
    .is_a('person')
    .has('value', 'age')
    .property('is the brother of', 'person')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M that is a person and has the value V as ~ age ~ and ~ is the brother of ~ the person P.')
})

test('can create new instances', t => {
  let sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')

  t.is(sentences.toString(), 'there is a man named \'John\'.')

  sentences = new CE.Sentences()
  sentences
    .there_is_an('ant', 'John')

  t.is(sentences.toString(), 'there is an ant named \'John\'.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John Smith')

  t.is(sentences.toString(), 'there is a man named \'John Smith\'.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('person', 'John')
    .is_a('man')

  t.is(sentences.toString(), 'there is a person named \'John\' that is a man.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('person', 'John')
    .is_an('ant')

  t.is(sentences.toString(), 'there is a person named \'John\' that is an ant.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .has('value', '53', 'age')

  t.is(sentences.toString(), 'there is a man named \'John\' that has the value \'53\' as age.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('person', 'John')
    .is_an('ant')
    .has('value', '53', 'age')

  t.is(sentences.toString(), 'there is a person named \'John\' that is an ant and has the value \'53\' as age.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('person', 'John')
    .is_an('ant')
    .has(null, '53', 'age')

  t.is(sentences.toString(), 'there is a person named \'John\' that is an ant and has \'53\' as age.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .property('is the sibling of', 'person', 'Jill')

  t.is(sentences.toString(), 'there is a man named \'John\' that is the sibling of the person \'Jill\'.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is_a('football fan')
    .property('supports', null, 'united')

  t.is(sentences.toString(), 'there is a man named \'John\' that is a football fan and supports \'united\'.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is_a('football fan')
    .property('supports', 'team', 'united')

  t.is(sentences.toString(), 'there is a man named \'John\' that is a football fan and supports the team \'united\'.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .property('is the sibling of', 'person', 'Jill')
    .has(null, '53', 'age')
    .property('is the brother of', 'person', 'James')
    .has(null, 'united', 'team')

  t.is(sentences.toString(), 'there is a man named \'John\' that is the sibling of the person \'Jill\' and has \'53\' as age and is the brother of the person \'James\' and has \'united\' as team.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .property('is the sibling of', 'person', 'Jill')
    .has('colour', 'brown', 'hair colour')
    .property('is the brother of', 'person', 'James')
    .has(null, 'united', 'team')

  t.is(sentences.toString(), 'there is a man named \'John\' that is the sibling of the person \'Jill\' and has the colour \'brown\' as hair colour and is the brother of the person \'James\' and has \'united\' as team.')
})

test('can extend instances', t => {
  let sentences = new CE.Sentences()
  sentences
    .the('man', 'John')

  t.is(sentences.toString(), 'the man \'John\'.')

  sentences = new CE.Sentences()
  sentences
    .the('man', 'John')
    .property('is the sibling of', 'person', 'Jill')
    .has(null, '53', 'age')
    .is_a('football fan')
    .property('supports', null, 'united')
    .has(null, 'united', 'team')

  t.is(sentences.toString(), 'the man \'John\' is the sibling of the person \'Jill\' and has \'53\' as age and is a football fan and supports \'united\' and has \'united\' as team.')
})

test('can construct multiple sentences', t => {
  let sentences = new CE.Sentences()

  sentences
    .conceptualise_a('man')

  sentences
    .there_is_a('man', 'John')

  sentences
    .the('man', 'John')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M. there is a man named \'John\'. the man \'John\'.')
})

test('can create new queries', t => {
  let sentences = new CE.Sentences()
  sentences
    .query('parent')

  t.is(sentences.toString(), '[ parent ]\n')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .there_is_a('person', 'V1')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( there is a person named V1 )\n.')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .is_a('person', 'V1', 'man')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( the person V1 is a man )\n.')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .property('person', 'V1', 'is the parent of', 'person', 'V2')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( the person V1 is the parent of the person V2 )\n.')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .there_is_an('animal', 'V1')
    .is_an('animal', 'V1', 'ant')
    .property('animal', 'V1', 'is the parent of', 'animal', 'V2')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( there is an animal named V1 ) and\n  ( the animal V1 is an ant ) and\n  ( the animal V1 is the parent of the animal V2 )\n.')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .there_is_an('animal', 'V1')
    .is_an('animal', 'V1', 'ant')
    .property('animal', 'V1', 'is the parent of', 'animal', 'V2')
    .has('animal', 'V2', 'value', 'V3', 'age')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( there is an animal named V1 ) and\n  ( the animal V1 is an ant ) and\n  ( the animal V1 is the parent of the animal V2 ) and\n  ( the animal V2 has the value V3 as age )\n.')
})

test('can create new rules', t => {
  let sentences = new CE.Sentences()
  sentences
    .rule('sibling')

  t.is(sentences.toString(), '[ sibling ]\n')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()

  t.is(sentences.toString(), '[ sibling ]\nif\n')

  sentences = new CE.Sentences()

  let error = t.throws(() => {
    sentences
    .rule('sibling')
    .there_is_a('person', 'John')
  }, Error)

  t.is(error.message, 'Need to call .if() method before adding clauses.')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .there_is_a('person', 'John')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( there is a person named \'John\' )\n')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .there_is_an('animal', 'Andy')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( there is a animal named \'Andy\' )\n')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .is_a('person', 'P1', 'man')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 is a man )\n')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .has('person', 'P1', 'value', 'V', 'age')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 has the value V as age )\n')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .has_no('person', 'P1', 'value', 'V', 'age')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 has no value V as age )\n')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .has('person', 'P1', 'value', 'V', 'age')
    .then()

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 has the value V as age )\nthen\n')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .has('person', 'P1', 'value', 'V', 'age')
    .then()
    .is_a('person', 'P1', 'person of age')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 has the value V as age )\nthen\n  ( the person P1 is a person of age )\n.')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .has('person', 'P1', 'value', 'V', 'age')
    .then()
    .is_an('person', 'P1', 'aging person')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 has the value V as age )\nthen\n  ( the person P1 is an aging person )\n.')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .has_no('person', 'P1', 'value', 'V', 'age')
    .then()
    .has('person', 'P1', 'value', '\'unknown\'', 'age')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 has no value V as age )\nthen\n  ( the person P1 has the value \'unknown\' as age )\n.')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .property('person', 'P1', 'is the sibling of', 'person', 'P2')
    .then()
    .is_a('person', 'P1', 'sibling')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 is the sibling of the person P2 )\nthen\n  ( the person P1 is a sibling )\n.')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .property_no('person', 'P1', 'is the sibling of', 'person', 'P2')
    .then()
    .is_an('person', 'P1', 'only child')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 is the sibling of no person P2 )\nthen\n  ( the person P1 is an only child )\n.')

  sentences = new CE.Sentences()
  sentences
    .rule('sibling')
    .if()
    .property('person', 'P1', 'is the associate of', 'person', 'P2')
    .then()
    .property('person', 'P2', 'is the associate of', 'person', 'P1')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 is the associate of the person P2 )\nthen\n  ( the person P2 is the associate of the person P1 )\n.')
})
