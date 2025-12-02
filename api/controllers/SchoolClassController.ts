import type { Request, Response } from "express";
import { Op } from "sequelize";
import { SchoolClassServices } from "../services/index.js";

const schoolClassServices = new SchoolClassServices();

class SchoolClassController {
	static async getAllSchoolClasses(req: Request, res: Response) {
		const { initial_date, final_date } = req.query;

		const where: any = {};

		if (initial_date || final_date) {
			where.data_inicio = {};
		}

		if (initial_date) {
			where.data_inicio[Op.gte] = initial_date;
		}

		if (final_date) {
			where.data_inicio[Op.lte] = final_date;
		}

		try {
			const allSchoolClasses = await schoolClassServices.getAllRegisters(where);
			return res.status(200).json(allSchoolClasses);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async getSchoolClass(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const schoolClass = await schoolClassServices.getRegister({ id });
			return res.status(200).json(schoolClass);
		} catch (error) {
			return res.status(404).json((error as Error).message);
		}
	}

	static async createSchoolClass(req: Request, res: Response) {
		const newSchoolClass = req.body;
		try {
			const createdSchoolClass = await schoolClassServices.createRegister(newSchoolClass);
			return res.status(201).json(createdSchoolClass);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async updateSchoolClass(req: Request, res: Response) {
		const { id } = req.params;
		const updatedData = req.body;
		try {
			await schoolClassServices.updateRegister(updatedData, id);
			const updatedSchoolClass = await schoolClassServices.getRegister({ id });
			return res.status(200).json(updatedSchoolClass);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async deleteSchoolClass(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await schoolClassServices.deleteRegister(id);
			return res.status(200).json({ menssage: `id ${id} deletado com sucesso` });
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async restoreSchoolClass(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await schoolClassServices.restoreRegister(id);
			return res.status(200).json({ menssagem: `id ${id} restaurado` });
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}
}

export default SchoolClassController;
