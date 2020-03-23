"use strict";

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      errorNumber: "required",
      level: "required|max:2024",
      level: "required|max:256",
      log: "required|max:2024",
      title: "required|max:256",
    };
  }

  get messages() {
    return {
      "environment.max": "Ambiente muito grande.",
      "environment.required": "Você deve fornecer um ambiente.",
      "errorNumber.required": "Você deve fornecer um numero de erro.",
      "level.max": "Level muito grande.",
      "level.required": "Você deve fornecer um level.",
      "log.max": "Log muito grande.",
      "log.required": "Você deve fornecer um log.",
      "title.max": "Título muito grande.",
      "title.required": "Você deve fornecer um título.",
    };
  }
}

module.exports = User;
