"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("username", 80).notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.string("token", 25).notNullable();
      table.string("recovery_token", 25);
      table.date("recovery_token_date");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
