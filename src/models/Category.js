module.exports = (seq, dt) => {
  const Category = seq.define('Category', {
    id: {
      type: dt.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: dt.STRING,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  return Category;
};
