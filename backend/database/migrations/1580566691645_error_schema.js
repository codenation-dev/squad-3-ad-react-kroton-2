'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ErrorSchema extends Schema {
  up () {
    this.create('errors', (table) => {
      table.increments()
      table.string("userToken", 25).notNullable()
      table.string("title", 256).notNullable()
      table.string("environment", 256).notNullable()
      table.integer("errorNumber").notNullable()
      table.integer("events").notNullable()
      table.string("level", 24).notNullable()
      table.string("log", 2024).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('errors')
  }
}

module.exports = ErrorSchema
