'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class metatags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // This is metatags model.
    }
  };
  metatags.init({
    en_title: DataTypes.STRING,
    tc_title: DataTypes.STRING,
    sc_title: DataTypes.STRING,
    en_description: DataTypes.STRING,
    tc_description: DataTypes.STRING,
    sc_description: DataTypes.STRING,
    priority: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'metatags',
    underscored: true
  });
  return metatags;
};