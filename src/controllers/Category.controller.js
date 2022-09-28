const { Category } = require('../services');

const getAll = async (_req, res, next) => {
  try {
    const category = await Category.getAll();
    return res.status(200).json(category);
  } catch (e) {
    next(e);
  }
};

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
  getAll,
};
