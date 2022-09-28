module.exports = (seq, dt) => {
  const PostCategory = seq.define('PostCategory', {
    postId: {
      type: dt.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'blog_posts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    categoryId: {
      type: dt.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, { through: models.PostCategory, unique: false, foreignKey: 'post_id' });
    models.Category.belongsToMany(models.BlogPost, { through: models.PostCategory, unique: false, foreignKey: 'category_id' });
  }

  return PostCategory;
}
