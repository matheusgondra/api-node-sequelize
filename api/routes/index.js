import cors from "cors";
import { json } from "express";
import niveis from "./levelsRoutes.js";
import pessoas from "./peopleRoutes.js";
import turmas from "./schoolClassRoutes.js";

export default (app) => {
	app.use(json(), cors(), pessoas, niveis, turmas);
};
