const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: res.statusCode === 200 ? 500 : res.statusCode,
    msg: err.message || 'Something went wrong!',
  };

  if (err.name === 'CastError' || res.statusCode === 404) {
    defaultError.statusCode === 404;
    defaultError.msg = 'Product not found!';
  }

  if (err.code === 11000) {
    defaultError.status === 400;
    defaultError.msg = 'Email is already exist';
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
