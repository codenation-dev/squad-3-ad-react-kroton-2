"use strict";

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      errorNumber: "required",
      level: "required|max:2024",
      log: "required|max:2024"
    };
  }

  get messages() {
    return {
      "errorNumber.required": "Você deve fornecer um numero de erro.",
      "level.required": "Você deve fornecer um level.",
      "level.max": "Level muito grande.",
      "log.required": "Você deve fornecer um log.",
      "log.max": "Log muito grande."
    };
  }
}

module.exports = User;
