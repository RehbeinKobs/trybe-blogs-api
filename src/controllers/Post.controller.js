const { Post } = require('../services');

const getAll = async (_req, res, next) => {
  try {
    const posts = await Post.getAll();
    return res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
};
