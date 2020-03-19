"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ErrorModel = use("App/Models/Error");

/**
 * Resourceful controller for interacting with errors
 */
class ErrorController {
  /**
   * Show a list of all errors.
   * GET errors
   *
   * @param {object} ctx
   * @param {Request} ctx.auth
   */
  async index({ auth, request }) {
    const user = await auth.getUser();
    const { page = 1, perpage = 10 } = request.all();

    const errors = await ErrorModel.query()
      .where({ userToken: user.token })
      .paginate(page, perpage);

    return errors || [];
  }

  /**
   * Create/save a new error.
   * POST errors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const { token } = request.all();
    const data = request.only(["errorNumber", "level", "log"]);

    const error = await ErrorModel.query()
      .where({ ...data, userToken: token })
      .fetch();

    if (error.toJSON().length > 0) {
      const updateError = await ErrorModel.find(error.toJSON()[0].id);
      updateError.merge({ events: updateError.events + 1 });

      await updateError.save();

      return updateError;
    } else {
      request;
      const newError = new ErrorModel();
      newError.merge({ ...data, userToken: token, events: 1 });

      await newError.save();

      return newError;
    }
  }

  /**
   * Display a single error.
   * GET errors/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async show({ auth, params, response }) {
    const user = await auth.getUser();
    const id = params.id;

    const error = await ErrorModel.find(id);

    if (error.userToken !== user.token) {
      return response.status(401).send("Not authorized");
    }

    return error;
  }

  /**
   * Update error details.
   * PUT or PATCH errors/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const user = await auth.getUser();
    const data = request.only(["errorNumber", "level", "log"]);
    const id = params.id;

    const error = await ErrorModel.find(id);

    if (error.userToken !== user.token) {
      return response.status(401).send("Not authorized");
    }

    error.merge(data);

    await error.save();

    return error;
  }

  /**
   * Delete an error with id.
   * DELETE errors/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, response }) {
    const user = await auth.getUser();

    const id = params.id;

    const error = await ErrorModel.find(id);

    if (error.userToken !== user.token) {
      return response.status(401).send("Not authorized");
    }

    await error.delete();
  }
}

module.exports = ErrorController;
