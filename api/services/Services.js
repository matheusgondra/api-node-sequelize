import database from "../models/index.js";

class Services {
	constructor(modelName) {
		this.modelName = modelName;
	}

	async getAllRegisters(where = {}) {
		return database[this.modelName].findAll({ where });
	}

	async getRegister(where = {}) {
		return database[this.modelName].findOne({ where });
	}

	async createRegister(data) {
		return database[this.modelName].create(data);
	}

	async updateRegister(updatedData, id, transaction = {}) {
		return database[this.modelName].update(updatedData, { where: { id } }, transaction);
	}

	async updateRegisters(updatedData, where, transaction = {}) {
		return database[this.modelName].update(updatedData, { where }, transaction);
	}

	async deleteRegister(id) {
		return database[this.modelName].destroy({ where: { id } });
	}

	async restoreRegister(id) {
		return database[this.modelName].restore({ where: { id } });
	}

	async findAndCountResgisters(where = {}, aggregators) {
		return database[this.modelName].findAndCountAll({ where, ...aggregators });
	}
}

export default Services;
