import { literal } from "sequelize";
import { ResgistrationsServices } from "../services/index.js";

const registrationsServices = new ResgistrationsServices();

class RegistrationController {
	static async getRegistration(req, res) {
		const { studentId, registrationId } = req.params;
		try {
			const registration = await registrationsServices.pegaUmRegistro({	id: registrationId, estudante_id: studentId });
			return res.status(200).json(registration);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async createRegistration(req, res) {
		const { studentId } = req.params;
		const newRegistration = { ...req.body, estudante_id: Number(studentId) };
		try {
			const newRegistrationCreated = await registrationsServices.createRegister(newRegistration);
			return res.status(200).json(newRegistrationCreated);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updateRegistration(req, res) {
		const { studentId, registrationId } = req.params;
		const data = req.body;
		try {
			await registrationsServices.updateRegisters(data, { id: Number(registrationId), estudante_id: Number(studentId) });
			return res.status(200).json({ mensagem: `id ${registrationId} atualizado` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async deleteRegistration(req, res) {
		const { registrationId } = req.params;
		try {
			await registrationsServices.deleteRegister(Number(registrationId));
			return res.status(200).json({ mensagem: `id ${registrationId} deletado` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async restoreRegistration(req, res) {
		const { registrationId } = req.params;
		try {
			await registrationsServices.restoreRegister(Number(registrationId));
			return res.status(200).json({ mensagem: `id ${registrationId} restaurado` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getAllRegistrationsBySchoolClass(req, res) {
		const { schoolClassId } = req.params;
		try {
			const allRegistrations =
				await registrationsServices.findAndCountResgisters(
					{ turma_id: Number(schoolClassId), status: "confirmado" },
					{ limit: 20, order: [["estudante_id", "DESC"]] }
				);
			return res.status(200).json(allRegistrations);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getCrowdedSchoolClass(req, res) {
		const crowdedSchoolClass = 2;
		try {
			const allCrowdedSchoolClass = await registrationsServices.findAndCountResgisters(
					{ status: "confirmado" },
					{
						attributes: ["turma_id"],
						group: ["turma_id"],
						having: literal(`count(turma_id) >= ${crowdedSchoolClass}`),
					}
				);
			return res.status(200).json(allCrowdedSchoolClass.count);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

export default RegistrationController;
