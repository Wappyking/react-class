const { Router } = require("express");
const routes = Router();

routes.use("/auth", require("../auth/auth-routes"));

module.exports = routes;
