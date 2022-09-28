module.exports = (seq, dt) => {
  const BlogPost = seq.define('BlogPost', {
    id: {
      type: dt.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: dt.STRING,
    },
    content: {
      type: dt.STRING,
    },
    userId: {
      primaryKey: true,
      type: dt.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    published: {
      type: dt.DATE,
    },
    updated: {
      type: dt.DATE,
    }
  }, {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return BlogPost;
}
