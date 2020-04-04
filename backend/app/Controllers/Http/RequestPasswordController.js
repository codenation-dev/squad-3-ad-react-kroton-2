"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

const crypto = require("crypto");
const { isAfter, subDays } = require("date-fns");
const Mail = require("../../../lib/Mail");

const User = use("App/Models/User");

class RequestPasswordController {
  async store({ request: req }) {
    try {
      const { email, redirect = `${Env.get("APP_URL")}/change` } = req.all();

      const user = await User.query().where({ email }).first();

      if (!user) {
        return { error: "User not found" };
      }

      await user.merge({
        recovery_token: crypto.randomBytes(10).toString("hex"),
        recovery_token_date: new Date(),
      });

      await user.save();

      const recovery = user.toJSON();

      await Mail.sendMail({
        to: `${recovery.username} <${recovery.email}>`,
        subject: "Recuperação de senha - LOGGER.IO",
        template: "forgot_password",
        context: {
          email: recovery.email,
          link: `${redirect}/?token=${recovery.recovery_token}`,
        },
      });

      return {
        status: "OK",
        redirect,
        message: "Email sended, check your e-mail inbox",
      };
    } catch (err) {
      return {
        error: "Error, verify your e-mail and try again",
      };
    }
  }

  async update({ request: req }) {
    try {
      const { token: recovery_token } = req.params;

      const { password } = req.all();

      if (!recovery_token) {
        return res.status("400").send({ error: "Valid token is required" });
      }

      const user = await User.query().where({ recovery_token }).first();

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const recover = user.toJSON();

      const recovery_date = recover.recovery_token_date;

      const oneDayAgo = subDays(new Date(), 1);

      const tokenExpired = isAfter(oneDayAgo, recovery_date);

      if (tokenExpired) {
        return res.status(401).send({
          error: "Token expired, try again",
        });
      }

      await user.merge({
        recovery_token: null,
        recovery_token_date: null,
        password: password,
      });

      await user.save();

      return {
        status: "OK",
        message: "Success! Your password changed",
      };
    } catch (err) {
      console.log(err);
      return { error: "Error, try again" };
    }
  }
}

module.exports = RequestPasswordController;
