const { Op } = require('sequelize');
const { User } = require('../models');
const { checkMissingFields, checkFieldMinLength, checkEmail } = require('./validations');
const createError = require('../utils/createError');

const getAll = async () => {
  const users = await User.findAll();
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
  const user = await User.findByPk(id);
  return user;
};

const login = async (body) => {
  const { email, password } = body;
  checkMissingFields([email, password]);
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
};
