"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ErrorSchema extends Schema {
  up() {
    this.create("errors", (table) => {
      table.increments();
      table.string("userToken", 25).notNullable();
      table.integer("errorNumber").notNullable();
      table.integer("events").notNullable();
      table.string("level", 24).notNullable();
      table.string("title", 50).notNullable();
      table.string("log", 2024).notNullable();
      table.boolean("closed").notNullable();
      table.string("ambient", 20).notNullable();
      table.string("collectedBy", 25).notNullable();
      table.date("dateCaptured").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("errors");
  }
}

module.exports = ErrorSchema;
