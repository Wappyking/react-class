const { Router } = require("express");
const {
  SendMoneyFunction,
  AddMoneyFunction,
  RequestMoneyFunction,
  RequestResponseFunction,
} = require("./transaction-controller");
const routes = Router();

routes.post("/send-money", SendMoneyFunction);
routes.post("/add-money", AddMoneyFunction);
routes.post("/request-money", RequestMoneyFunction);
routes.post("/request-response", RequestResponseFunction);
// routes.get("/all-transactions");

module.exports = routes;
