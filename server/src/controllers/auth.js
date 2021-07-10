import config from '../config';
import * as authService from '../services/auth';
import * as githubService from '../services/github';
import { Request, Response, NextFunction } from 'express';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function githubCallback(req, res, next) {
  try {
    const { code } = req.query;

    const profile = await githubService.getProfile(code);

    const data = await authService.authenticate(profile);

    console.log(data);

    res.cookie('accessToken', data.accessToken);

    return res.redirect(config.app.redirectURL);

    // return res.json(data);
  } catch (error) {
    next(error);
  }
}
