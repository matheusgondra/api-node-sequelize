const express = require("express");
const cors = require("cors");
const pessoas = require("./peopleRoutes");
const niveis = require("./levelsRoutes");
const turmas = require("./schoolClassRoutes");

module.exports = app => {
    app.use(
        express.json(),
		  cors(),
        pessoas,
		  niveis,
		  turmas
    );
}