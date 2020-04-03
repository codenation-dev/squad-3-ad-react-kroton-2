"use strict";

const User = use("App/Models/User");

class AuthController {
  async signIn({ auth, request }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }

  async signUp({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }
}

module.exports = AuthController;
