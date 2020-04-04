"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

module.exports = {
  host: Env.get("MAIL_HOST"),
  port: Env.get("MAIL_PORT"),
  secure: false,
  auth: {
    user: Env.get("MAIL_USERNAME"),
    pass: Env.get("MAIL_PASSWORD"),
  },
  default: {
    from: "LOGGER.IO <noreply@logger.io>",
  },
};
