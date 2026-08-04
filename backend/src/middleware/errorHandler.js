const errorHandlerMiddleware = async (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "internel server error";

  res
    .status(statusCode)
    .json({ success: false, status: statusCode, message: message });
};

module.exports = errorHandlerMiddleware;
