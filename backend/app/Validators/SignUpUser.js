"use strict";

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required",
      email: "required|email|unique:users",
      password: "required"
    };
  }

  get messages() {
    return {
      "username.required": "Você deve fornecer um nome.",
      "email.required": "Você deve fornecer um endereço de email.",
      "email.email": "Você deve fornecer um endereço de email válido.",
      "email.unique": "Este e-mail já está registado.",
      "password.required": "Você deve fornecer uma senha"
    };
  }
}

module.exports = User;
