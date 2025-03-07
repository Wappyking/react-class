const { Router } = require("express");
const {
  LoginFunction,
  SignUpAuth,
  RequestOtp,
  verifyOtp,
} = require("./auth-controller");
const routes = Router();

routes.post("/login", LoginFunction);
routes.post("/register", SignUpAuth);
routes.post("/request-otp", RequestOtp);
routes.post("/verify-otp", verifyOtp);

module.exports = routes;
