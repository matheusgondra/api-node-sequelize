require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();

const port = process.env.PORT || 3000;

routes(app);

app.get("/", (req, res) => {
    return res.status(200).json({ msg: "OK" })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

