const { Router } = require("express");
const { SignUpAuth } = require("./auth-controller");
const routes = Router();

routes.post("/register", SignUpAuth);

module.exports = routes;
