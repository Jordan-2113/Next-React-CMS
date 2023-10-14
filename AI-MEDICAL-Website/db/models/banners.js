'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  banners.init({
    banner_path: DataTypes.STRING,
    priority: DataTypes.BIGINT,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'banners',
    underscored: true
  });
  return banners;
};