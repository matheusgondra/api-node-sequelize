const { Op } = require("sequelize");
const { SchoolClassServices } = require("../services");
const schoolClassServices = new SchoolClassServices();

class TurmaController {
	static async getAllSchoolClasses(req, res) {
		const { initial_date, final_date } = req.query;
		const where = {};
		initial_date || final_date ? where.data_inicio = {} : null;
		initial_date ? where.data_inicio[Op.gte] = initial_date : null;
		final_date ? where.data_inicio[Op.lte] = final_date : null;
		try {
			const allSchoolClasses = await schoolClassServices.getAllRegisters(where);
			return res.status(200).json(allSchoolClasses);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getSchoolClass(req, res) {
		const { id } = req.params;
		try {
			const schoolClass = await schoolClassServices.getRegister({ id });
			return res.status(200).json(schoolClass);
		} catch (error) {
			return res.status(404).json(error.message);
		}
	}

	static async createSchoolClass(req, res) {
		const newSchoolClass = req.body;
		try {
			const createdSchoolClass = await schoolClassServices.createRegister(newSchoolClass);
			return res.status(201).json(createdSchoolClass);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updateSchoolClass(req, res) {
		const { id } = req.params;
		const updatedData = req.body;
		try {
			await schoolClassServices.updateRegister(updatedData);
			const updatedSchoolClass = await schoolClassServices.getRegister({ id });
			return res.status(200).json(updatedSchoolClass);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async deleteSchoolClass(req, res) {
		const { id } = req.params;
		try {
			await schoolClassServices.deleteRegister(id);
			return res.status(200).json({ menssage: `id ${id} deletado com sucesso` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async restoreSchoolClass(req, res) {
		const { id } = req.params;
		try {
			await schoolClassServices.restoreRegister(id);
			return res.status(200).json({ menssagem: `id ${id} restaurado` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = TurmaController;