const database = require("../models");
const Sequelize = require("sequelize");

class PessoaController {
	static async getActivePeople(req, res) {
		try {
			const allPeople = await database.Pessoas.findAll();
			return res.status(200).json(allPeople);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getAllPeople(req, res) {
		try {
			const allPeople = await database.Pessoas.scope("todos").findAll();
			return res.status(200).json(allPeople);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getPerson(req, res) {
		const { id } = req.params;
		try {
			const person = await database.Pessoas.findOne({ where: { id: Number(id) } });
			return res.status(200).json(person);
		} catch (error) {
			return res.status(404).json(error.message);
		}
	}

	static async createPerson(req, res) {
		const newPerson = req.body;
		try {
			const createdPerson = await database.Pessoas.create(newPerson);
			return res.status(201).json(createdPerson);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updatePerson(req, res) {
		const { id } = req.params;
		const updatedData = req.body;
		try {
			await database.Pessoas.update(updatedData, { where: { id: Number(id) } });
			const updatedPerson = await database.Pessoas.findOne({ where: { id: Number(id) } });
			return res.status(200).json(updatedPerson);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async deletePerson(req, res) {
		const { id } = req.params;
		try {
			await database.Pessoas.destroy({ where: { id: Number(id) } });
			return res.status(200).json({ menssage: `id ${id} deletado com sucesso` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getAllRegistrations(req, res) {
		const { studentId } = req.params;
		try {
			const person = await database.Pessoas.findOne({ where: {id: Number(studentId)}});
			const registrations = await person.getAulasMatriculadas();
			return res.status(200).json(registrations);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getAllRegistrationsBySchoolClass(req, res) {
		const { schoolClassId } = req.params;
		try {
			const allRegistrations = await database.Matriculas.findAndCountAll({
				where: {
					turma_id: Number(schoolClassId),
					status: "confirmado"
				},
				limit: 20,
				order: [["estudante_id", "DESC"]]
			});
			return res.status(200).json(allRegistrations);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getCrowdedSchoolClass(req, res) {
		const crowdedSchoolClass = 2;
		try {
			const allCrowdedSchoolClass = await database.Matriculas.findAndCountAll({
				where: {
					status: "confirmado"
				},
				attributes: ["turma_id"],
				group: "turma_id",
				having: Sequelize.literal(`COUNT(turma_id) >= ${crowdedSchoolClass}`)
			});
			return res.status(200).json(allCrowdedSchoolClass.count);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getRegistration(req, res) {
		const { studentId, registrationId } = req.params;
		try {
			const registration = await database.Matriculas.findOne({
				where: {
					id: Number(registrationId),
					estudante_id: Number(studentId)
				}
			});
			return res.status(200).json(registration);
		} catch (error) {
			return res.status(404).json(error.message);
		}
	}

	static async createRegistration(req, res) {
		const { studentId } = req.params;
		const newRegistration = { ...req.body, estudante_id: Number(studentId) };
		try {
			const createdRegistration = await database.Matriculas.create(newRegistration);
			return res.status(201).json(createdRegistration)
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updateRegistration(req, res) {
		const { studentId, registrationId } = req.params;
		const updatedData = req.body;
		try {
			await database.Matriculas.update(updatedData, {
				where: {
					id: Number(registrationId),
					estudante_id: Number(studentId)
				}
			});
			const registration = await database.Matriculas.findOne({
				where: {
					id: Number(registrationId),
					estudante_id: Number(studentId)
				}
			});
			return res.status(200).json(registration);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async deleteRegistration(req, res) {
		const { studentId, registrationId } = req.params;
		try {
			await database.Matriculas.destroy({
				where: {
					id: Number(registrationId),
					estudante_id: Number(studentId)
				}
			});
			return res.status(200).json(`Matricula com id ${registrationId} deletado`);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async restorePerson(req, res) {
		const { id } = req.params;
		try {
			await database.Pessoas.restore({ where: { id: Number(id) } });
			return res.status(200).json({ menssagem: `id ${id} restaurado` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async restoreRegistration(req, res) {
		const { studentId, registrationId } = req.params;
		try {
			await database.Matriculas.restore({
				where: {
					id: Number(registrationId),
					estudante_id: Number(studentId)
				}
			});
			return res.status(200).json({ menssagem: `id ${id} restaurado` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async cancelPerson(req, res) {
		const { studentId } = req.params;
		try {
			database.sequelize.transaction(async (transaction) => {
				await database.Pessoas.update({ ativo: false }, { where: { id: Number(id) } }, { transaction });
				await database.Matriculas.update({ status: "cancelado" }, { where: { estudante_id: Number(studentId) } }, { transaction });
				return res.status(200).json({ message: `Matriculas referentes ao estudante ${studentId} canceladas` });
			});
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = PessoaController;