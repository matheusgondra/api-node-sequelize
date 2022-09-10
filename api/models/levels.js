'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Levels extends Model {
    static associate(models) {
      Levels.hasMany(models.Turmas, {
        foreignKey: "nivel_id"
      })
    }
  }
  Levels.init({
    descr_nivel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Niveis',
    paranoid: true
  });
  return Levels;
};