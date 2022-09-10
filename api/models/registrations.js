'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resgistrations extends Model {
    static associate(models) {
      Resgistrations.belongsTo(models.Pessoas, {
        foreignKey: "estudante_id"
      });
      Resgistrations.belongsTo(models.Turmas, {
        foreignKey: "turma_id"
      });
    }
  }
  Resgistrations.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matriculas',
    paranoid: true
  });
  return Resgistrations;
};