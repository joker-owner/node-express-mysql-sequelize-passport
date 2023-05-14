const bcrypt = require('bcrypt-nodejs');

module.exports = (pwd) => (bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null));