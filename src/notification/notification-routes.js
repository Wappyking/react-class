const { Router } = require("express");
const { AllNotificationsFunction } = require("./notification-controller");

const routes = Router();

routes.get("/notifications", AllNotificationsFunction);

module.exports = routes;
