const { RequestError } = require('../helpers');

const isValidBody = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(RequestError(400, error.message));
    }

    next();
  };
};

module.exports = isValidBody;
