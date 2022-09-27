const { Op } = require('sequelize');
const { User } = require('../models');
const createError = require('../utils/createError');

const login = async (body) => {
  const { email, password } = body;
  if ([email, password].some((f) => f === undefined || f.length <= 0)) {
    throw createError(400, 'Some required fields are missing');
  }
  const userId = await User.findAll({
    attributes: ['id'],
    where: {
      [Op.and]: {
        email,
        password,
      },
    },
  });
  if (userId.length > 0) return userId;
  throw createError(400, 'Invalid fields');
};

module.exports = {
  login,
};
