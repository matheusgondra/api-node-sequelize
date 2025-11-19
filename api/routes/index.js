import { json } from "express";
import cors from "cors";
import pessoas from "./peopleRoutes.js";
import niveis from "./levelsRoutes.js";
import turmas from "./schoolClassRoutes.js";

export default app => {
    app.use(
        json(),
		cors(),
        pessoas,
		niveis,
		turmas
    );
}