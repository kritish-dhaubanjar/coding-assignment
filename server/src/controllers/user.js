import * as userService from '../services/user';
import { Request, Response, NextFunction } from 'express';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function index(req, res, next) {
  try {
    const users = await userService.findAll();

    return res.json(users);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function show(req, res, next) {
  try {
    const { id } = req.params;

    const user = await userService.findById(id);

    return res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function articles(req, res, next) {
  try {
    const { id: userId } = req.params;

    const user = await userService.findArticlesByUserId(userId);

    return res.json(user);
  } catch (err) {
    next(err);
  }
}
