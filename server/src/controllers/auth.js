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

    return res.json(profile);
  } catch (error) {
    next(error);
  }
}
