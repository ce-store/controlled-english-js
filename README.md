# controlled-english-js

JavaScript library for generating [Controlled English](http://ce-editor.mybluemix.net/) sentences and interacting with [backend stores](https://github.com/ce-store/ce-store/).

## Installation

```
$ npm install controlled-english
```

## Usage

```javascript
const CE = require('controlled-english')
const sentences = new CE.Sentences()

sentences
  .there_is_a('person', 'John')
  .is_a('man')
  .has('value', '53', 'age')
  .property('is the sibling of', 'person', 'Jill')

sentences
  .the('person', 'John')
  .has('colour', 'brown', 'hair colour')
  .property('owns', 'pet', 'Fluffy')

console.log(sentences.toString())
```

Running this source code prints the following Controlled English sentences to the console.

```
there is a person named John that
  is a man and
  has the value '53' as age and
  is the sibling of the person 'Jill'.

the person John
  has the colour 'brown' as hair colour and
  owns the pet 'Fluffy'.
```

This text can be saved to a Controlled English backend store using the `CE.Store` class.

```javascript
const store = new CE.Store({
  host: 'localhost:8080',
  store: 'DEFAULT'
})

store.save(sentences)
  .then(result => console.log(result))
  .catch(err => console.log('failed', err))
```

**Sentence Properties**

These methods return an instance of that sentence type. This allows the addition of properties through [method chaining](https://en.wikipedia.org/wiki/Method_chaining).

```javascript
sentences
  .there_is_a('man', 'John')
  .is_a('football fan')
```

**Creating Multiple Sentences**

Each time these methods are called a new sentence instance is added to the internal list of sentences. This allows building Controlled English paragraphs from multiple sentences.

```javascript
sentences
  .conceptualise_a('man')

sentences
  .there_is_a('man', 'John')

sentences
 .the('man', 'John')
```

```
conceptualise a ~ man ~ M. there is a man named John. the man John.
```

# Set up

## CE.Sentences

New instances of the `CE.Sentences` class can be created using the `new` keyword.

```javascript
const sentences = new CE.Sentences()
```

The instance will maintain a list of Controlled English sentences created through the API. The current source text can be retrieved using the `.toString()` method.

```javascript
const paragraph = sentences.toString()
```

# Creating Concepts

New concepts can be created using the following methods.

## .conceptualise_a(concept)

Creates a new concept.

```
sentences
  .conceptualise_a('man')
```

```
conceptualise a ~ man ~ M.
```

## .conceptualise_an(concept)

Alias of `.conceptualise_a`.

## .is_a(concept)

Sets the new concept to also have a parent concept.

```
sentences
  .conceptualise_a('man')
  .is_a('person')
```

```
conceptualise a ~ man ~ M that
  is a person.
```

## .is_an(concept)

Alias of `.is_a`.

## .has(concept, property)

Adds a property to the concept of the form:

```
sentences
  .conceptualise_a('man')
  .has('value', 'age')
  .has('colour', 'hair colour')
```

```
conceptualise a ~ man ~ M that
  has the value V as ~ age ~ and
  has the colour C as ~ hair colour ~.
```

## .property(property, concept)

Adds a property to the concept of the form:

```
sentences
  .conceptualise_a('man')
  .property('is the sibling of', 'person')
```

```
conceptualise a ~ man ~ M that
  ~ is the sibling of ~ the person P.
```

# Creating Instances

Adding new sentences to the instance can be achieved using the following methods.

## .there_is_a(concept, instance)

Defines a new instance.

```
sentences
  .there_is_a('person', 'John')
```

```
there is a person named 'John'.
```

## .there_is_an(concept, instance)

Alias of `.there_is_a`.

## .the(concept, instance)

Extends an existing instance.

```
sentences
  .the('person', 'John')
```

```
the person 'John'.
```

## .is_a(concept)

Adds new concept to an instance.

```
sentences
  .the('person', 'John')
  .is_a('man')
```

```
the person 'John'
  is a man.
```

## .is_an(concept)

Alias of `.is_a`.

## .has(concept, value, property)

Adds a new property of the form:

```
sentences
  .the('person', 'John')
  .has('value', '53', 'age')
```

```
the person 'John'
  has the value '53' as age.
```

## .property(property, concept, value)

Adds a new property of the form:

```
sentences
  .the('person', 'John')
  .property('is the sibling of', 'person', 'Jill')
```

```
the person 'John'
  is the sibling of the person 'Jill'.
```

# Queries

Queries can be constructed using the following methods.

## .query(name)

Creates a new query.

```
sentences
  .query('person')
```

```
[ person ]
```

## .for(...variables)

First line of a query setting up the variables.

```
sentences
  .query('person')
  .for('V1', 'V2')
```

```
[ person ]
for which V1 and V2 is it true
```

## .there_is_a(concept, variable)

Tests if there is an instance of that concept.

```
sentences
  .query('person')
  .for('V1', 'V2')
  .there_is_a('person', 'V1')
```

```
[ person ]
for which V1 and V2 is it true
  ( there is a person named V1 )
.
```

## .there_is_an(concept, variable)

Alias for `.there_is_a`.

## .is_a(concept, variable, parent_concept)

Tests if an instance has the parent concept.

```
sentences
  .query('man')
  .for('V1', 'V2')
  .there_is_a('person', 'V1')
  .is_a('person', 'V1', 'man')
```

```
[ man ]
for which V1 and V2 is it true
  ( there is a person named V1 ) and
  ( the person V1 is a man )
.
```
## .is_an(concept, variable, parent_concept)

Alias for `.is_a`.

## .has(concept, variable1, property_concept, variable2, property)

Tests if each of the matching instances has the property.

```
sentences
  .query('age')
  .for('V1', 'V2')
  .there_is_a('person', 'V1')
  .has('person', 'V1', 'value', 'V2', 'age')
```

```
[ age ]
for which V1 and V2 is it true
  ( there is a person named V1 ) and
  ( the person V1 has the value V2 as age )
.
```

## .property(concept, variable1, property, property_concept, variable2)

Tests if each of the matching instances has the property.

```
sentences
  .query('sibling')
  .for('V1', 'V2')
  .there_is_a('person', 'V1')
  .property('person', 'V1', 'is the sibling of', 'person', 'V2')
```

```
[ sibling ]
for which V1 and V2 is it true
  ( there is a person named V1 ) and
  ( the person V1 is the sibling of the person V2 )
.
```

# Rules

Rules can be constructed using the following methods.

## .rule(name)

Creates a rule.

```
sentences
  .rule('male')
```

```
[ 'male' ]
```

## .if()

Enter the if statement of the rule.

```
sentences
  .rule('male')
  .if()
```

```
[ 'male' ]
if
```

## .there_is_a(concept, variable)

Tests if there is an instance of the concept.

```
sentences
  .rule('male')
  .if()
  .there_is_a('person', 'V1')
```

```
[ 'male' ]
if
  ( there is a person named V1 )
```

## .there_is_an(concept, variable)

Alias of `.there_is_a`.

## .is_a(concept, variable, parent_concept)

Tests if an instance has the parent concept.

```
sentences
  .rule('male')
  .if()
  .there_is_a('person', 'V1')
  .is_a('person', 'V1', 'male')
```

```
[ 'male' ]
if
  ( there is a person named V1 ) and
  ( the person V1 is male )
```

## .is_an(concept, variable, parent_concept)

Alias of `.is_a`.

## .has(concept, variable1, property_concept, variable2, property)

Test if an instance has the propety.

```
sentences
  .rule('male')
  .if()
  .there_is_a('person', 'V1')
  .has('person', 'V1', 'value', 'V1', 'age')
```

```
[ 'male' ]
if
  ( there is a person named V1 ) and
  ( the person V1 has the value V2 as age )
```

## .has_no(concept, variable1, property_concept, variable2, property)

Test if an instance doesn't have the propety.

**Can only be used in the if statement**

```
sentences
  .rule('male')
  .if()
  .there_is_a('person', 'V1')
  .has_no('person', 'V1', 'value', 'V1', 'age')
```

```
[ 'male' ]
if
  ( there is a person named V1 ) and
  ( the person V1 has no value V2 as age )
```

## .property(concept, variable1, property, property_concept, variable2)

Test if an instance has the property.

```
sentences
  .rule('male')
  .if()
  .there_is_a('person', 'V1')
  .property('person', 'V1', 'is the sibling of', 'person', 'V2')
```

```
[ 'male' ]
if
  ( there is a person named V1 ) and
  ( the person V1 is the sibling of the person V2 )
```

## .property_no(concept, variable1, property, property_concept, variable2)

Test if an instance has the property.

**Can only be used in the if statement**

```
sentences
  .rule('male')
  .if()
  .there_is_a('person', 'V1')
  .property_no('person', 'V1', 'is the sibling of', 'person', 'V2')
```

```
[ 'male' ]
if
  ( there is a person named V1 ) and
  ( the person V1 is the sibling of no person V2 )
```

## .then()

Enter the then statement of the rule

```
sentences
  .rule('male')
  .if()
  .there_is_a('person', 'V1')
  .then()
  .is_a('person', 'V1', 'human')
```

```
[ 'male' ]
if
  ( there is a person named V1 )
then
  ( the person V1 is a human )
.
```

# CE.Store

The `CE.Store` class is a utility class to help you to save Controlled English sentences to a backend store.

```javascript
const store = new CE.Store({
  host: 'localhost:8080',
  store: 'DEFAULT'
})

const sentences = new CE.Sentences()
sentences
  .there_is_a('man', 'James')

store.save(sentences)
  .then(result => console.log(result))
  .catch(err => console.log('failed', err))

store.save("there is a person named James.")
  .then(result => console.log(result))
  .catch(err => console.log('failed', err))
```

 The `save()` method will call the `toString()` on the function parameter. This is present on the `CE.Sentences` class and also on JavaScript strings.
