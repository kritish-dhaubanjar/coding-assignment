import { Request, Response, NextFunction } from 'express';

/**
 * Error Handler.
 *
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */

export function genericErrorHandler(err, req, res, next) {
  console.error(err);
  return res.status(err.statusCode || 500).json(err);
}
