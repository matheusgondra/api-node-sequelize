import { Router } from "express";
import PessoaController from "../controllers/PersonController.js";
import Registrationontroller from "../controllers/RegistrationController.js";

const router = Router();

router
	.get("/pessoas", PessoaController.getAllPeople)
	.get("/pessoas/ativas", PessoaController.getActivePeople)
	.get("/pessoas/:id", PessoaController.getPerson)
	.get("/pessoas/:studentId/matricula", PessoaController.getAllRegistrations)
	.get("/pessoas/:studentId/matricula/:registrationId", Registrationontroller.getRegistration)
	.get("/pessoas/matricula/:schoolClassId/confirmadas", Registrationontroller.getAllRegistrationsBySchoolClass)
	.get("/pessoas/matricula/lotada", Registrationontroller.getCrowdedSchoolClass)
	.post("/pessoas", PessoaController.createPerson)
	.post("/pessoas/:id/restaura", PessoaController.restorePerson)
	.post("/pessoas/:studentId/matricula", Registrationontroller.createRegistration)
	.post("/pessoas/:studentId/matricula/:registrationId/restaura", Registrationontroller.restoreRegistration)
	.post("/pessoas/:studentId/cancela", PessoaController.cancelPerson)
	.put("/pessoas/:id", PessoaController.updatePerson)
	.put("/pessoas/:studentId/matricula/:registrationId", Registrationontroller.updateRegistration)
	.delete("/pessoas/:id", PessoaController.deletePerson)
	.delete("/pessoas/:studentId/matricula/:registrationId", Registrationontroller.deleteRegistration);

export default router;
