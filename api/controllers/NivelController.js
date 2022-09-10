const Services = require("../services/Services");
const levelServices = new Services("Niveis");

class NivelController {
	static async getAllLevels(req, res) {
		try {
			const allLevels = await levelServices.getAllRegisters();
			return res.status(200).json(allLevels);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getLevel(req, res) {
		const { id } = req.params;
		try {
			const level = await levelServices.getRegister({ id });
			return res.status(200).json(level);
		} catch (error) {
			return res.status(404).json(error.message);
		}
	}

	static async createLevel(req, res) {
		const newLevel = req.body;
		try {
			const createdLevel = await levelServices.createRegister(newLevel);
			return res.status(201).json(createdLevel);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updateLevel(req, res) {
		const { id } = req.params;
		const updatedData = req.body;
		try {
			await levelServices.updateRegister(updatedData, id);
			const updatedLevel = await levelServices.getRegister({ id });
			return res.status(200).json(updatedLevel);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async deleteLevel(req, res) {
		const { id } = req.params;
		try {
			await levelServices.deleteRegister(id);
			return res.status(200).json({ menssage: `id ${id} deletado com sucesso` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async restoreLevel(req, res) {
		const { id } = req.params;
		try {
			await levelServices.restoreRegister(id);
			return res.status(200).json({ menssagem: `id ${id} restaurado` });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = NivelController;