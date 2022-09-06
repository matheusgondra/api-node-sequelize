const express = require("express");
const cors = require("cors");
const pessoas = require("./pessoaRoutes");
const niveis = require("./niveisRoutes");
const turmas = require("./turmasRoutes");

module.exports = app => {
    app.use(
        express.json(),
		  cors(),
        pessoas,
		  niveis,
		  turmas
    );
}