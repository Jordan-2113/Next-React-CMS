'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  services.init({
    slug:DataTypes.STRING(500),
    en_metaname:DataTypes.STRING(500),
    tc_metaname:DataTypes.STRING(500),
    sc_metaname:DataTypes.STRING(500),
    en_metadesc:DataTypes.STRING(500),
    tc_metadesc:DataTypes.STRING(500),
    sc_metadesc:DataTypes.STRING(500),
    en_title: DataTypes.STRING(500),
    tc_title: DataTypes.STRING(500),
    sc_title: DataTypes.STRING(500),
    en_content: DataTypes.TEXT('long'),
    tc_content: DataTypes.TEXT('long'),
    sc_content: DataTypes.TEXT('long'),
    alttext:DataTypes.STRING(500),
    picture: DataTypes.STRING,
    priority: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'services',
    underscored: true
  });
  return services;
};