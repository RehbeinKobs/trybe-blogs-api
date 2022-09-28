const Category = (seq, dt) => seq.define('Category', {
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

module.exports = Category;
