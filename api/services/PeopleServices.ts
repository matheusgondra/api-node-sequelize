import { database } from "../models/index.js";
import Services from "./Services.js";

class PeopleServices extends Services {
	private readonly registers: Services;

	constructor() {
		super("Pessoas");
		this.registers = new Services("Matriculas");
	}

	async getRegisterActive(where = {}) {
		return database[this.modelName].findAll({ where });
	}

	async getAllRegisters(where = {}) {
		return database[this.modelName].scope("todos").findAll({ where });
	}

	async cancelPersonAndRegisters(studentId: number) {
		return database.sequelize.transaction(async (transaction: any) => {
			await super.updateRegister({ ativo: false }, studentId, { transaction });
			await this.registers.updateRegisters({ status: "cancelado" }, { estudante_id: studentId }, { transaction });
		});
	}

	async getRegistrationsByStudent(where = {}) {
		const registrations = await database[this.modelName].findOne({ where });
		return registrations.getAulasMatriculadas();
	}
}

export default PeopleServices;
