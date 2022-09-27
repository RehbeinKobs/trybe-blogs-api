require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../services');

const secret = process.env.JWT_SECRET;

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

module.exports = {
  login,
};
