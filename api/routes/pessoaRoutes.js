const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
	.get("/pessoas", PessoaController.getAllPeople)
	.get("/pessoas/ativas", PessoaController.getActivePeople)
	.get("/pessoas/:id", PessoaController.getPerson)
	.get("/pessoas/:studentId/matricula", PessoaController.getAllRegistrations)
	.get("/pessoas/:studentId/matricula/:registrationId", PessoaController.getRegistration)
	.get("/pessoas/matricula/:schoolClassId/confirmadas", PessoaController.getAllRegistrationsBySchoolClass)
	.get("/pessoas/matricula/lotada", PessoaController.getCrowdedSchoolClass)
	.post("/pessoas", PessoaController.createPerson)
	.post("/pessoas/:id/restaura", PessoaController.restorePerson)
	.post("/pessoas/:studentId/matricula", PessoaController.createRegistration)
	.post("/pessoas/:studentId/matricula/:registrationId/restaura", PessoaController.restoreRegistration)
	.post("/pessoas/:studentId/cancela", PessoaController.cancelPerson)
	.put("/pessoas/:id", PessoaController.updatePerson)
	.put("/pessoas/:studentId/matricula/:registrationId", PessoaController.updateRegistration)
	.delete("/pessoas/:id", PessoaController.deletePerson)
	.delete("/pessoas/:studentId/matricula/:registrationId", PessoaController.deleteRegistration);

module.exports = router;