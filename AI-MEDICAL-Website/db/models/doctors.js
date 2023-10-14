'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.doctor_specialty);
      this.hasMany(models.doctor_attainments);
    }
  };
  doctors.init({
    picture: DataTypes.STRING(300),
    alttext: DataTypes.STRING(300),
    slug: DataTypes.STRING(1000),
    en_metaname: DataTypes.STRING(1000),
    tc_metaname: DataTypes.STRING(1000),
    sc_metaname: DataTypes.STRING(1000),
    en_metadesc: DataTypes.STRING(1000),
    tc_metadesc: DataTypes.STRING(1000),
    sc_metadesc: DataTypes.STRING(1000),
    en_name: DataTypes.STRING(1000),
    tc_name: DataTypes.STRING(1000),
    sc_name: DataTypes.STRING(1000),
    en_title: DataTypes.STRING(1000),
    tc_title: DataTypes.STRING(1000),
    sc_title: DataTypes.STRING(1000),
    en_description: DataTypes.TEXT('long'),
    tc_description: DataTypes.TEXT('long'),
    sc_description: DataTypes.TEXT('long'),
    en_dialect: DataTypes.STRING,
    tc_dialect: DataTypes.STRING,
    sc_dialect: DataTypes.STRING,
    en_clinic: DataTypes.STRING,
    tc_clinic: DataTypes.STRING,
    sc_clinic: DataTypes.STRING,
    priority: DataTypes.BIGINT,
    visible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'doctors',
    underscored: true
  });
  return doctors;
};