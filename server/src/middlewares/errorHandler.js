export function genericErrorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json(err);
}
