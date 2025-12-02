import { readdirSync } from "node:fs";
import { basename as _basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DataTypes, Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);

const configModue = await import(new URL("../config/config.js", import.meta.url).toString());
const config = configModue.default[env];
const database: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = readdirSync(__dirname).filter((file) => {
	return file.indexOf(".") !== 0 && file !== basename && (file.slice(-3) === ".js" || file.slice(-3) === ".ts");
});

for (const file of files) {
	const moduleUrl = new URL(file, import.meta.url);
	const module = await import(moduleUrl.href);
	const defineModel = module.default;
	const model = defineModel(sequelize, DataTypes);
	database[model.name] = model;
}

Object.keys(database).forEach((modelName) => {
	if (database[modelName].associate) {
		database[modelName].associate(database);
	}
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export { database };
