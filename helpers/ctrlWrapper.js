const ctrlWrapper = (crtl) => {
  return async (req, res, next) => {
    try {
      await crtl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
