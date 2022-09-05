const express = require("express");
const pessoas = require("./pessoaRoutes");

module.exports = app => {
    app.use(
        express.json(),
        pessoas
    );
}