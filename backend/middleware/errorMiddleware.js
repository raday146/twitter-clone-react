class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.orignalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, res, req, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : res.stack,
  });
};

export { notFound, errorHandler, AppError };
