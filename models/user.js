module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    uuid: DataTypes.UUID,
    firstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    accessToken: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailConfirmationToken: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
    },
    resetPasswordTokenExpiration: {
      type: DataTypes.DATE
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    timestamps: true,
  });
  return user;
};
