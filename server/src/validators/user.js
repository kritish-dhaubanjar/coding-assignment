import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const query = Joi.object({
  id: Joi.string().required().label("User ID"),
});

/**
 * Validate User query.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function validateQuery(req, res, next) {
  const { error } = query.validate(req.params);

  if (error) next(error);

  next();
}
