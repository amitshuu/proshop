const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: res.statusCode === 200 ? 500 : res.statusCode,
    msg: err.msg || 'Something went wrong',
  };

  if (err.name === 'CastError' || res.statusCode === 404) {
    defaultError.statusCode === 404;
    defaultError.msg = 'Product not found!';
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
