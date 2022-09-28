const User = (seq, dt) => seq.define('User', {
    id: {
      type: dt.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: dt.STRING,
    },
    email: {
      type: dt.STRING,
      unique: true,
    },
    password: {
      type: dt.STRING,
    },
    image: {
      type: dt.STRING,
    },
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
});

module.exports = User;
