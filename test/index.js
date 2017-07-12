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
    .has(null, '53', 'age')

  t.is(sentences.toString(), 'there is a man named John that has \'53\' as age.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is('sibling', 'person', 'Jill')

  t.is(sentences.toString(), 'there is a man named John that is the sibling of the person Jill.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is('football fan')
    .property('supports', null, 'united')

  t.is(sentences.toString(), 'there is a man named John that is a football fan and supports \'united\'.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is('football fan')
    .property('supports', 'team', 'united')

  t.is(sentences.toString(), 'there is a man named John that is a football fan and supports the team \'united\'.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is('sibling', 'person', 'Jill')
    .has(null, '53', 'age')
    .is('brother', 'person', 'James')
    .has(null, 'united', 'team')

  t.is(sentences.toString(), 'there is a man named John that is the sibling of the person Jill and has \'53\' as age and is the brother of the person James and has \'united\' as team.')

  sentences = new CE.Sentences()
  sentences
    .there_is_a('man', 'John')
    .is('sibling', 'person', 'Jill')
    .has('colour', 'brown', 'hair colour')
    .is('brother', 'person', 'James')
    .has(null, 'united', 'team')

  t.is(sentences.toString(), 'there is a man named John that is the sibling of the person Jill and has the colour \'brown\' as hair colour and is the brother of the person James and has \'united\' as team.')
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
    .has(null, '53', 'age')
    .is('football fan')
    .property('supports', null, 'united')
    .has(null, 'united', 'team')

  t.is(sentences.toString(), 'the man John is the sibling of the person Jill and has \'53\' as age and is a football fan and supports \'united\' and has \'united\' as team.')
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

test('can construct multiple sentences', t => {
  let sentences = new CE.Sentences()

  sentences
    .concept('man', 'M')

  sentences
    .there_is_a('man', 'John')

  sentences
    .the('man', 'John')

  t.is(sentences.toString(), 'conceptualise a ~ man ~ M. there is a man named John. the man John.')
})

test('can create new queries', t => {
  let sentences = new CE.Sentences()

  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n\n.')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .there('person', 'V1')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( there is a person named V1 )\n.')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .the('person', 'V1', 'man')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( the person V1 is a man )\n.')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .the('person', 'P1', 'is the parent of', 'person', 'P2')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( the person P1 is the parent of the person P2 )\n.')

  sentences = new CE.Sentences()
  sentences
    .query('parent')
    .for('V1', 'V2', 'V3')
    .there('person', 'V1')
    .the('person', 'V1', 'man')
    .the('person', 'P1', 'is the parent of', 'person', 'P2')

  t.is(sentences.toString(), '[ parent ]\nfor which V1, V2 and V3 is it true that\n  ( there is a person named V1 ) and\n  ( the person V1 is a man ) and\n  ( the person P1 is the parent of the person P2 )\n.')
})

test('can create new rules', t => {
  let sentences = new CE.Sentences()

  sentences
    .rule('sibling')
    .the('person', 'P1', 'is the associate of', 'person', 'P2')
    .then()
    .the('person', 'P2', 'is the associate of', 'person', 'P1')

  t.is(sentences.toString(), '[ sibling ]\nif\n  ( the person P1 is the associate of the person P2 )\nthen\n  ( the person P2 is the associate of the person P1 )\n.')

  sentences = new CE.Sentences()
  sentences
    .rule('male')
    .the('person', 'P1', 'male')
    .then()
    .the('person', 'P1', 'not female')

  t.is(sentences.toString(), '[ male ]\nif\n  ( the person P1 is a male )\nthen\n  ( the person P1 is a not female )\n.')

  sentences = new CE.Sentences()
  sentences
    .rule('male')
    .there('person', 'V1')
    .then()
    .there('person', 'V2')

  t.is(sentences.toString(), '[ male ]\nif\n  ( there is a person named V1 )\nthen\n  ( there is a person named V2 )\n.')

  sentences = new CE.Sentences()
  sentences
    .rule('male')
    .there('person', 'V1')
    .the('person', 'P1', 'male')
    .then()
    .there('person', 'V2')
    .the('person', 'P1', 'not female')

  t.is(sentences.toString(), '[ male ]\nif\n  ( there is a person named V1 ) and\n  ( the person P1 is a male )\nthen\n  ( there is a person named V2 ) and\n  ( the person P1 is a not female )\n.')
})
