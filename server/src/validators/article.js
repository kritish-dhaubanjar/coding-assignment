import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const query = Joi.object({
  id: Joi.string().required().label("Article ID"),
});

const schema = Joi.object({
  title: Joi.string().required().label("Article Title"),
  body: Joi.string().required().label("Article Body"),
});

/**
 * Validate query.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function validateQuery(req, res, next) {
  const { error } = query.validate(req.params);

  if (error) return next(error);

  next();
}

/**
 * Validate article for upsert.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function validateUpsert(req, res, next) {
  const { error } = schema.validate(req.body);

  if (error) return next(error);

  next();
}
