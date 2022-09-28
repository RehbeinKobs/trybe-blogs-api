const { Category } = require('../models');
const createError = require('../utils/createError');

const create = async (body) => {
  const { name } = body;
  if (!name || name.length <= 0) throw createError(400, '"name" is required');
  const createdCategory = await Category.create({ name });
  return createdCategory;
};

module.exports = {
  create,
};
