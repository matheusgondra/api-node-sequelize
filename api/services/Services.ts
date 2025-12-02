import database from "../models/index.js";

class Services {
	private modelName: any;

	constructor(modelName: any) {
		this.modelName = modelName;
	}

	async getAllRegisters(where = {}) {
		return database[this.modelName].findAll({ where });
	}

	async getRegister(where = {}) {
		return database[this.modelName].findOne({ where });
	}

	async createRegister(data: any) {
		return database[this.modelName].create(data);
	}

	async updateRegister(updatedData: any, id: any, transaction = {}) {
		return database[this.modelName].update(updatedData, { where: { id } }, transaction);
	}

	async updateRegisters(updatedData: any, where: any, transaction = {}) {
		return database[this.modelName].update(updatedData, { where }, transaction);
	}

	async deleteRegister(id: any) {
		return database[this.modelName].destroy({ where: { id } });
	}

	async restoreRegister(id: any) {
		return database[this.modelName].restore({ where: { id } });
	}

	async findAndCountResgisters(where = {}, aggregators: any) {
		return database[this.modelName].findAndCountAll({ where, ...aggregators });
	}
}

export default Services;
