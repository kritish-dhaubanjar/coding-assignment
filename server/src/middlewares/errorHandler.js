export function genericErrorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500).json(err);
}
