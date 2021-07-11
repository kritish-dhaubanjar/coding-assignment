import config from '../config';
import * as authService from '../services/auth';
import * as githubService from '../services/github';
import { Request, Response, NextFunction } from 'express';

/**
 * Handle callback from github OAuth.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function githubCallback(req, res, next) {
  try {
    const { code, state = '' } = req.query;

    const profile = await githubService.getProfile(code);

    const data = await authService.authenticate(profile);

    console.log(data);

    res.cookie('accessToken', data.accessToken);

    return res.redirect(config.app.redirectURL + state);

    // return res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * Get current authenticated user.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function authUser(req, res, next) {
  try {
    const user = req.user;

    return res.json(user);
  } catch (error) {
    next(error);
  }
}
