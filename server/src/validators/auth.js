import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const githubCallback = Joi.object({
  code: Joi.string().required().label("Authorization Code"),
  state: Joi.string().label("State"),
});

/**
 * Validate github callback.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function validateCallback(req, res, next) {
  const { error } = githubCallback.validate(req.query);

  if (error) next(error);

  next();
}
