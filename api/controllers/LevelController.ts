import type { Request, Response } from "express";
import Services from "../services/Services.js";

const levelServices = new Services("Niveis");

class LevelController {
	static async getAllLevels(_req: Request, res: Response) {
		try {
			const allLevels = await levelServices.getAllRegisters();
			return res.status(200).json(allLevels);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async getLevel(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const level = await levelServices.getRegister({ id });
			return res.status(200).json(level);
		} catch (error) {
			return res.status(404).json((error as Error).message);
		}
	}

	static async createLevel(req: Request, res: Response) {
		const newLevel = req.body;
		try {
			const createdLevel = await levelServices.createRegister(newLevel);
			return res.status(201).json(createdLevel);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async updateLevel(req: Request, res: Response) {
		const { id } = req.params;
		const updatedData = req.body;
		try {
			await levelServices.updateRegister(updatedData, id);
			const updatedLevel = await levelServices.getRegister({ id });
			return res.status(200).json(updatedLevel);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async deleteLevel(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await levelServices.deleteRegister(id);
			return res.status(200).json({ menssage: `id ${id} deletado com sucesso` });
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async restoreLevel(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await levelServices.restoreRegister(id);
			return res.status(200).json({ menssagem: `id ${id} restaurado` });
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}
}

export default LevelController;
