'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor_attainments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  doctor_attainments.init({
    en_name: DataTypes.STRING,
    tc_name: DataTypes.STRING,
    sc_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'doctor_attainments',
    underscored: true
  });
  return doctor_attainments;
};