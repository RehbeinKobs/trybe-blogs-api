require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../services');

const secret = process.env.JWT_SECRET;

const getAll = async (_req, res, next) => {
  try {
    const users = await User.getAll();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.getById(id);
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const userId = await User.login(body);
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: { userId } }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const userId = await User.create(body);
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: { userId } }, secret, jwtConfig);
    return res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
  create,
  getAll,
  getById,
};
