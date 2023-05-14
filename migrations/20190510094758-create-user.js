module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    uuid: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    LastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    accessToken: {
      type: Sequelize.STRING,
    },
    refreshToken: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    emailConfirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    emailConfirmationToken: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
    },
    resetPasswordTokenExpiration: {
      type: Sequelize.DATE
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
