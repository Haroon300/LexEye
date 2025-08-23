const errorMiddleware = (err, req, res, next) => {
  const error = err || {};
  console.error(error.stack || error); 
  
  const statusCode = error.statusCode || error.status || 500;
  const message = error.message || "Something went wrong!";

  return res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export default errorMiddleware;