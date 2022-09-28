const { Category } = require('../services');

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const category = await Category.create(body);
    return res.status(201).json(category);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
};
