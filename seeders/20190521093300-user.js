require("dotenv");
const jwt = require('jsonwebtoken');
const config = require('../config');
const uuidV4 = require('uuid/v4');
const generateHash = require("../utils/generateHash");
const payload = {
  uuid: uuidV4(),
  email: 'admin@gmail.com'
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users',
    [
      {
        uuid: uuidV4(),
        firstName: 'Michael',
        lastName: 'Yap',
        email: 'admin@gmail.com',
        accessToken: jwt.sign(payload, config.app.secret, {
          expiresIn: 60 * 30 // expires in 30 min
        }),
        refreshToken: jwt.sign(payload, config.app.secret, {
          expiresIn: '90d' // expires in 3 month
        }),
        password: generateHash("rootpassword"),
        emailConfirmed: true,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};