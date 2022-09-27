const { Op } = require('sequelize');
const { User } = require('../models');
const { checkMissingFields, checkFieldMinLength, checkEmail } = require('./validations');
const createError = require('../utils/createError');

const listById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getByEmail = async (email) => {
  const user = await User.findAll({
    where: {
      email,
    },
  });
  return user;
};

const getById = async (id) => {
  const user = await listById(id);
  if (user) return user;
  throw createError(404, 'User does not exist');
};

const login = async (body) => {
  const { email, password } = body;
  checkMissingFields([email, password]);
  const user = await User.findOne({
    attributes: ['id'],
    where: {
      [Op.and]: {
        email,
        password,
      },
    },
  });
  if (user) {
    const { id } = await user.toJSON();
    return id;
  }
  throw createError(400, 'Invalid fields');
};

const create = async (body) => {
  const { displayName, email, password, image } = body;
  const user = await getByEmail(email);
  checkFieldMinLength(displayName, 'displayName', 8);
  checkFieldMinLength(password, 'password', 6);
  checkEmail(email);
  if (user.length > 0) {
    throw createError(409, 'User already registered');
  }
  const createdUser = await User.create({
    displayName,
    email,
    password,
    image,
  });
  const { id } = await createdUser.toJSON();
  return id;
};

module.exports = {
  login,
  create,
  getById,
  getAll,
  listById,
};
