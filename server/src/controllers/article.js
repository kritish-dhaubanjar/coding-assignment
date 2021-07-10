import * as articleService from '../services/article';
import { Request, Response, NextFunction } from 'express';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function articles(req, res, next) {
  try {
    const articles = await articleService.findAll();

    return res.json(articles);
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
    const { id: articleId } = req.params;

    const article = await articleService.findById(articleId);

    return res.json(article);
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
export async function store(req, res, next) {
  try {
    const author = req.user;
    const article = req.body;

    const data = await articleService.save(author, article);

    return res.json(data);
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
export async function update(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { id: articleId } = req.params;
    const article = req.body;

    const data = await articleService.update(userId, articleId, article);

    return res.json(data);
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
export async function destroy(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { id: articleId } = req.params;

    const data = await articleService.destroy(userId, articleId);

    return res.json(data);
  } catch (err) {
    next(err);
  }
}
