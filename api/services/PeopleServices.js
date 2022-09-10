const Services = require("./Services");
const database = require("../models");

class PeopleServices extends Services {
    constructor() {
        super("Pessoas");
		  this.registers = new Services("Matriculas");
    }

	 async getRegisterActive(where = {}) {
		return database[this.modelName].findAll({ where: { ...where } });
	 }

	 async getAllRegisters(where = {}) {
		return database[this.modelName].scope("todos").findAll({ where: { ...where } });
	 }

	 async cancelPersonAndRegisters(studentId) {
		return database.sequelize.transaction(async transaction => {
			await super.updateRegister({ ativo: false }, studentId, { transaction });
			await this.registers.updateRegisters({ status: "cancelado" }, { estudante_id: studentId }, { transaction });
		});
	 }

	 async getRegistrationsByStudent(where = {}) {
		const registrations = await database[this.modelName].findOne({ where: { ...where } });
		return registrations.getAulasMatriculadas();
	 }
}

module.exports = PeopleServices;