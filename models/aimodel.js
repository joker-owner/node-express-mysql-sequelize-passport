'use strict';
module.exports = (sequelize, DataTypes) => {
  const aimodel = sequelize.define('aimodel', {
    modelId: DataTypes.STRING,
    cateId: DataTypes.INTEGER
  }, {});
  aimodel.associate = function (models) {
    // associations can be defined here
  };
  return aimodel;
};