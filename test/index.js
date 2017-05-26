'use strict'

import test from 'ava'
import CE from '../index.js'

test('can create new instances', t => {
  let sentence = new CE.Sentence()

  sentence
    .there.is.a('man', 'John')
  t.is(sentence.toString(), 'there is a man named John.')

  sentence = new CE.Sentence()
  sentence
    .there.is.a('man', 'John')
    .has('53', 'age')

  t.is(sentence.toString(), 'there is a man named John that has \'53\' as age.')

  sentence = new CE.Sentence()
  sentence
    .there.is.a('man', 'John')
    .has('53', 'age')
    .has('manchester', 'home')

  t.is(sentence.toString(), 'there is a man named John that has \'53\' as age and has \'manchester\' as home.')

  sentence = new CE.Sentence()
  sentence
    .there.is.a('man', 'John')
    .has('53', 'age')
    .has('manchester', 'home')
    .has('united', 'team')

  t.is(sentence.toString(), 'there is a man named John that has \'53\' as age and has \'manchester\' as home and has \'united\' as team.')

  sentence = new CE.Sentence()
  sentence
    .there.is.a('man', 'John')
    .is('sibling').of('person', 'Jill')

  t.is(sentence.toString(), 'there is a man named John that is the sibling of the person Jill.')

  sentence = new CE.Sentence()
  sentence
    .there.is.a('man', 'John')
    .has('53', 'age')
    .is('sibling').of('person', 'Jill')

  t.is(sentence.toString(), 'there is a man named John that has \'53\' as age and is the sibling of the person Jill.')

  sentence = new CE.Sentence()
  sentence
    .there.is.a('man', 'John')
    .has('53', 'age')
    .is('sibling').of('person', 'Jill')
    .is('brother').of('person', 'James')

  t.is(sentence.toString(), 'there is a man named John that has \'53\' as age and is the sibling of the person Jill and is the brother of the person James.')

  sentence = new CE.Sentence()
  sentence
    .there.is.a('man', 'John')
    .is('sibling').of('person', 'Jill')
    .has('53', 'age')
    .is('brother').of('person', 'James')
    .has('united', 'team')

  t.is(sentence.toString(), 'there is a man named John that is the sibling of the person Jill and has \'53\' as age and is the brother of the person James and has \'united\' as team.')
})

test('can extend instances', t => {
  let sentence = new CE.Sentence()
  sentence
    .the('man', 'John')

  t.is(sentence.toString(), 'the man John.')

  sentence = new CE.Sentence()
  sentence
    .the('man', 'John')
    .has('53', 'age')

  t.is(sentence.toString(), 'the man John has \'53\' as age.')

  sentence = new CE.Sentence()
  sentence
    .the('man', 'John')
    .is('sibling').of('person', 'Jill')

  t.is(sentence.toString(), 'the man John is the sibling of the person Jill.')

  sentence = new CE.Sentence()
  sentence
    .the('man', 'John')
    .has('53', 'age')
    .is('sibling').of('person', 'Jill')

  t.is(sentence.toString(), 'the man John has \'53\' as age and is the sibling of the person Jill.')

  sentence = new CE.Sentence()
  sentence
    .the('man', 'John')
    .has('53', 'age')
    .is('sibling').of('person', 'Jill')
    .is('brother').of('person', 'James')

  t.is(sentence.toString(), 'the man John has \'53\' as age and is the sibling of the person Jill and is the brother of the person James.')

  sentence = new CE.Sentence()
  sentence
    .the('man', 'John')
    .is('sibling').of('person', 'Jill')
    .has('53', 'age')
    .is('brother').of('person', 'James')
    .has('united', 'team')

  t.is(sentence.toString(), 'the man John is the sibling of the person Jill and has \'53\' as age and is the brother of the person James and has \'united\' as team.')
})
