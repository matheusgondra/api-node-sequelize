'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class People extends Model {
    static associate(models) {
      People.hasMany(models.Turmas, {
        foreignKey: "docente_id"
      });
      People.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        scope: { status: "confirmado" },
        as: "aulasMatriculadas"
      })
    }
  }
  People.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validatorFunction: (data) => {
          if(data.length < 3) {
            throw new Error("O campo nome deve ter mais de 3 caracteres");
          }
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Dado do tipo e-mail inválido"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: { where: { ativo: true } },
    scopes: { todos: { where: {} } }
  });
  return People;
};