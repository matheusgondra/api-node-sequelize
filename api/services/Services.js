const database = require("../models");

class Services {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async getAllRegisters(where = {}) {
        return database[this.modelName].findAll({ where: { ...where }});
    }

    async getRegister(where = {}) {
		return database[this.modelName].findOne({ where: { ...where }});
    }

    async createRegister(data) {
      return database[this.modelName].create(data);
    }

    async updateRegister(updatedData, id, transaction = {}) {
		return database[this.modelName].update(updatedData, { where: { id: id } }, transaction);
    }

	 async updateRegisters(updatedData, where, transaction = {}) {
		return database[this.modelName].update(updatedData, { where: { ...where } }, transaction);
    }

    async deleteRegister(id) {
      return database[this.modelName].destroy({ where: { id: id } });
    }

	 async restoreRegister(id) {
		return database[this.modelName].restore({ where: { id: id } });
	 }

	 async findAndCountResgisters(where = {}, aggregators) {
		return database[this.modelName].findAndCountAll({ where: { ...where }, ...aggregators });
	 }
}

module.exports = Services;