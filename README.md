# controlled-english-js

JavaScript library for generating [Controlled English](http://ce-editor.mybluemix.net/) sentences and interacting with [backend stores](https://github.com/ce-store/ce-store/).

## installation

```
$ npm install controlled-english
```

## usage

```javascript
const CE = require('controlled-english')

const sentences = new CE.Sentences()

sentences
  .there_is_a('thing', 'Andy Murray')

sentences
  .the('thing', 'Andy Murray')
  .is('person')

sentences
  .the('person', 'Andy Murray')
  .has('brown', 'hair colour')
  .property('owns', 'cats')

console.log(sentences.toString())
```

Running this source code prints the following Controlled English sentences to the console. 

```
there is a thing named Andy Murray. 
the thing Andy Murray is a person. 
the person Andy Murray has 'brown' as hair colour and owns 'cats'.
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

## Classes 

### CE.Sentences

New instances of the `CE.Sentences` class can be created using the `new` keyword. 

```javascript
const sentences = new CE.Sentences()
```

The instance will maintain a list of Controlled English sentences created through the API. The current source text can be retrieved using the `.toString()` method. 

```javascript
const paragraph = sentences.toString()
```

Add new sentences to the instance can be achieved using the following methods

- ***there_is_a(concept_name, instance_name)*** - define new instances.
- ***the(concept_name, instance_name)*** - extend existing instances
- ***concept(concept_name, letters)*** - define new concepts
- ***query(query_name)*** - define new queries
- ***rule(rule_name)*** - define new rules

***Sentence Properties***

These methods return an instance of that sentence type. This allows the addition of properties through [method chaining](https://en.wikipedia.org/wiki/Method_chaining).

```javascript
sentences = new CE.Sentences()
sentences
  .there_is_a('man', 'John')
  .is('football fan')
```

***Creating Multiple Sentences***

Each time these methods are called a new sentence instance is added to the internal list of sentences. This allows building Controlled English paragraphs from multiple sentences. 

```javascript
const sentences = new CE.Sentences()

sentences
  .concept('man', 'M')

sentences
  .there_is_a('man', 'John')

sentences
 .the('man', 'John')
```

```
conceptualise a ~ man ~ M. there is a man named John. the man John.
```

### there_is_a(concept_name, instance_name)

```javascript
sentences = new CE.Sentences()
sentences
  .there_is_a('man', 'John')
  .is('football fan')
  .property('supports', 'united')
  .is('sibling', 'person', 'Jill')
  .has('united', 'team')
```

```
there is a man named John that is a football fan and supports 'united' and is the sibling of the person Jill and has 'united' as team.
```

### the(concept_name, instance_name)

```javascript
sentences = new CE.Sentences()
sentences
  .the('man', 'John')
  .is('football fan')
  .property('supports', 'united')
  .is('sibling', 'person', 'Jill')
  .has('united', 'team')
```

```
the man John is a football fan and supports 'united' and is the sibling of the person Jill and has 'united' as team.
```

### concept(concept_name, letters)

```javascript
sentences = new CE.Sentences()
sentences
  .concept('man', 'M')
  .is('person')
  .value('V', 'age')
  .property('is the brother of', 'person', 'P1')
```

```
conceptualise a ~ man ~ M that is a person and has the value V as ~ age ~ and ~ is the brother of ~ the person P1.
```

#### query(query_name)

```javascript
sentences = new CE.Sentences()
sentences
  .query('parent')
  .for('V1', 'V2', 'V3')
  .there('person', 'V1')
  .the('person', 'V1', 'man')
  .the('person', 'P1', 'is the parent of', 'person', 'P2')
```

```
[ parent ]
for which V1, V2 and V3 is it true that
  ( there is a person named V1 ) and
  ( the person V1 is a man ) and
  ( the person P1 is the parent of the person P2 )
.
```

#### rules(rule_name)

```javascript
sentences = new CE.Sentences()
sentences
  .rule('male')
  .there('person', 'V1')
  .the('person', 'P1', 'male')
  .then()
  .there('person', 'V2')
  .the('person', 'P1', 'not female')
```

```
[ male ]
if
  ( there is a person named V1 ) and
  ( the person P1 is a male )
then
  ( there is a person named V2 ) and
  ( the person P1 is a not female )
.
```

### CE.Store

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