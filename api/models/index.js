'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, dirname, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';

const env = process.env.NODE_ENV || 'development';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);

const configModue = await import(new URL("../config/config.js", import.meta.url));
const config = configModue.default[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(async file => {
    const moduleUrl = new URL(file, import.meta.url);
    const module = await import(moduleUrl.href);
    const defineModel = module.default;
    const model = defineModel(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
