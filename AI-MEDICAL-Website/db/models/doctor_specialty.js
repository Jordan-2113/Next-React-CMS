'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor_specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.doctors, { as: 'doctor' });
      this.belongsTo(models.specialties, { as: 'specialty' });
    }
  };
  doctor_specialty.init({
    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'doctor_specialty',
    underscored: true
  });
  return doctor_specialty;
};