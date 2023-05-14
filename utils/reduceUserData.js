const _ = require('lodash');
module.exports = function reduceUserData(userDetails) {
  return {
    ..._.pick(userDetails, [
      'uuid',
      'accessToken',
      'refreshToken',
    ])
  };
};