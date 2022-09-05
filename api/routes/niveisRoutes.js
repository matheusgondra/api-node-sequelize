const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();

router
	.get("/niveis", NivelController.getAllLevels)
	.get("/niveis/:id",NivelController.getLevel)
	.post("/niveis", NivelController.createLevel)
	.put("/niveis/:id", NivelController.updateLevel)
	.delete("/niveis/:id", NivelController.deleteLevel)
	.post("/niveis/:id/restaura", NivelController.restoreLevel);

module.exports = router;