'use strict'

const fetch = require('node-fetch')

class Store {
  constructor (params) {
    this.params = params
  }

  save (text) {
    const source = text.toString()
    return fetch(`${this.store_url()}/sentences?ceText=${source}`, { method: 'POST' })
      .then(res => res.json())
  }

  sentences () {
    return fetch(`${this.store_url()}/sentences`)
      .then(res => res.json())
  }

  store_url () {
    return `http://${this.params.host}/ce-store/stores/${this.params.store}`
  }
}

module.exports = Store
