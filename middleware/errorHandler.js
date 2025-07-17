module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.name || 'Error',
    message: err.message || 'Internal Server Error'
  });
}; 