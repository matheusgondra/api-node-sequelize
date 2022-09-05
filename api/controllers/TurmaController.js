const database = require("../models");

class TurmaController {
	static async getAllSchoolClasses(req, res) {
		try {
			const allSchoolClasses = await database.Turmas.findAll();
			return res.status(200).json(allSchoolClasses);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getSchoolClass(req, res) {
		const { id } = req.params;
		try {
			const schoolClass = await database.Turmas.findOne({ where: { id: Number(id) } });
			return res.status(200).json(schoolClass);
		} catch (error) {
			return res.status(404).json(error.message);
		}
	}

	static async createSchoolClass(req, res) {
		const newSchoolClass = req.body;
		try {
			const createdSchoolClass = await database.Turmas.create(newSchoolClass);
			return res.status(201).json(createdSchoolClass);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updateSchoolClass(req, res) {
		const { id } = req.params;
		const updatedData = req.body;
		try {
			await database.Turmas.update(updatedData, { where: { id: Number(id) } });
			const updatedSchoolClass = await database.Turmas.findOne({ where: { id: Number(id) } });
			return res.status(200).json(updatedSchoolClass);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async deleteSchoolClass(req, res) {
		const { id } = req.params;
		try {
			await database.Turmas.destroy({ where: { id: Number(id) } });
			return res.status(200).json({ menssage: `id ${id} deletado com sucesso` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async restoreSchoolClass(req, res) {
		const { id } = req.params;
		try {
			await database.Turmas.restore({ where: { id: Number(id) } });
			return res.status(200).json({ menssagem: `id ${id} restaurado` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = TurmaController;