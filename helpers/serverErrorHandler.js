const serverErrorHandler = (err, data, next) => {
  const { code, name } = err;
  err.status = code === 11000 && name === 'MongoServerError' ? 409 : 400;
  next();
};

module.exports = serverErrorHandler;
