const { Router } = require("express");
const SchoolClassController = require("../controllers/SchoolClassController");

const router = Router();

router
	.get("/turmas", SchoolClassController.getAllSchoolClasses)
	.get("/turmas/:id",SchoolClassController.getSchoolClass)
	.post("/turmas", SchoolClassController.createSchoolClass)
	.put("/turmas/:id", SchoolClassController.updateSchoolClass)
	.delete("/turmas/:id", SchoolClassController.deleteSchoolClass)
	.post("/turmas/:id/restaura", SchoolClassController.restoreSchoolClass);

module.exports = router;