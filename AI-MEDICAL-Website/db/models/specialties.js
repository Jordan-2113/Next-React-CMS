'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.doctor_specialty);
    }
  };
  specialties.init({
    slug: DataTypes.STRING,
    en_metaname: DataTypes.STRING,
    tc_metaname: DataTypes.STRING,
    sc_metaname: DataTypes.STRING,
    en_metadesc: DataTypes.STRING,
    tc_metadesc: DataTypes.STRING,
    sc_metadesc: DataTypes.STRING,
    en_name: DataTypes.STRING,
    tc_name: DataTypes.STRING,
    sc_name: DataTypes.STRING,
    en_description: DataTypes.STRING,
    tc_description: DataTypes.STRING,
    sc_description: DataTypes.STRING,
    icon: DataTypes.STRING,
    alttext: DataTypes.STRING,
    priority: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'specialties',
    underscored: true
  });
  return specialties;
};