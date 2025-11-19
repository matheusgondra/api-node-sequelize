import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";

const app = express();

const port = process.env.PORT || 3000;

routes(app);

app.get("/", (_req, res) => {
	return res.status(200).json({ msg: "OK" });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
