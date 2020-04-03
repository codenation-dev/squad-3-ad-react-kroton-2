"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Hash = use("Hash");

Factory.blueprint("App/Models/User", async () => {
  return {
    username: "Daniel Santos",
    email: "daniel@gmail.com",
    password: "daniel"
  };
});

Factory.blueprint("App/Models/Error", async faker => {
  return {
    errorNumber: faker.pickone([500, 502, 503, 504]),
    events: faker.integer({ min: 1, max: 400 }),
    level: faker.pickone(["Error", "Warning", "Debug"]),
    log: faker.paragraph(),
    closed: faker.pickone([false]),
    dateCaptured: faker.date({ year: 2020 }),
    ambient: faker.pickone(["Desenvolvimento", "Homologação", "Produção"]),
    collectedBy: faker.hash({ length: 25 }),
    title: faker.sentence({ words: 3 })
  };
});
