import type { Request, Response } from "express";
import { PeopleServices } from "../services/index.js";

const peopleServices = new PeopleServices();

class PersonController {
	static async getActivePeople(_req: Request, res: Response) {
		try {
			const allPeople = await peopleServices.getRegisterActive();
			return res.status(200).json(allPeople);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async getAllPeople(_req: Request, res: Response) {
		try {
			const allPeople = await peopleServices.getAllRegisters();
			return res.status(200).json(allPeople);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async getPerson(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const person = await peopleServices.getRegister(Number(id));
			return res.status(200).json(person);
		} catch (error) {
			return res.status(404).json((error as Error).message);
		}
	}

	static async createPerson(req: Request, res: Response) {
		const newPerson = req.body;
		try {
			const createdPerson = await peopleServices.createRegister(newPerson);
			return res.status(201).json(createdPerson);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async updatePerson(req: Request, res: Response) {
		const { id } = req.params;
		const updatedData = req.body;
		try {
			await peopleServices.updateRegister(updatedData, Number(id));
			const updatedPerson = await peopleServices.getRegister(Number(id));
			return res.status(200).json(updatedPerson);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async deletePerson(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await peopleServices.deleteRegister(Number(id));
			return res.status(200).json({ menssage: `id ${id} deletado com sucesso` });
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async restorePerson(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await peopleServices.restoreRegister(Number(id));
			return res.status(200).json({ menssagem: `id ${id} restaurado` });
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}

	static async getAllRegistrations(req: Request, res: Response) {
		const { studentId } = req.params;
		try {
			const registrations = await peopleServices.getRegistrationsByStudent({ id: Number(studentId) });
			return res.status(200).json(registrations);
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}
	static async cancelPerson(req: Request, res: Response) {
		const { studentId } = req.params;
		try {
			await peopleServices.cancelPersonAndRegisters(Number(studentId));
			return res.status(200).json({ message: `Matriculas referentes ao estudante ${studentId} canceladas` });
		} catch (error) {
			return res.status(500).json((error as Error).message);
		}
	}
}

export default PersonController;
