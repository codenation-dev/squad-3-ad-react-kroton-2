"use strict";

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: "required|email",
      password: "required"
    };
  }

  get messages() {
    return {
      "email.required": "Você deve fornecer um endereço de email.",
      "email.email": "Você deve fornecer um endereço de email válido.",
      "password.required": "Você deve fornecer uma senha"
    };
  }
}

module.exports = User;
