const { Router } = require("express");
const LevelController = require("../controllers/LevelController");

const router = Router();

router
	.get("/niveis", LevelController.getAllLevels)
	.get("/niveis/:id",LevelController.getLevel)
	.post("/niveis", LevelController.createLevel)
	.put("/niveis/:id", LevelController.updateLevel)
	.delete("/niveis/:id", LevelController.deleteLevel)
	.post("/niveis/:id/restaura", LevelController.restoreLevel);

module.exports = router;