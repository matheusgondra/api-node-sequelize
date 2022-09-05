const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();

router
	.get("/turmas", TurmaController.getAllSchoolClasses)
	.get("/turmas/:id",TurmaController.getSchoolClass)
	.post("/turmas", TurmaController.createSchoolClass)
	.put("/turmas/:id", TurmaController.updateSchoolClass)
	.delete("/turmas/:id", TurmaController.deleteSchoolClass)
	.post("/turmas/:id/restaura", TurmaController.restoreSchoolClass);

module.exports = router;