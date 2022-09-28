const { BlogPost, User, Category } = require('../models');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['user_id'] },
    include: [{
      attributes: { exclude: ['password'] },
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return posts;
};

module.exports = {
  getAll,
};
