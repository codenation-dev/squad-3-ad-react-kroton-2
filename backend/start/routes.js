"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/auth/signin", "AuthController.signIn");
Route.post("/auth/signup", "AuthController.signUp");

Route.get("/errors", "ErrorController.index").middleware(["auth"]);
Route.post("/errors", "ErrorController.store");
Route.get("/errors/:id", "ErrorController.show").middleware(["auth"]);
Route.put("/errors/:id", "ErrorController.update").middleware(["auth"]);
Route.delete("/errors/:id", "ErrorController.destroy").middleware(["auth"]);

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});
