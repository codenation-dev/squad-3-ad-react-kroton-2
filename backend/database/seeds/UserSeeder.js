"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UserSeeder {
  async run() {
    const user = await Factory.model("App/Models/User").create();
    const errors = await Factory.model("App/Models/Error").makeMany(30);

    for (const error of errors) {
      error.merge({
        userToken: user.toJSON().token
      });

      await error.save();
    }
  }
}

module.exports = UserSeeder;
