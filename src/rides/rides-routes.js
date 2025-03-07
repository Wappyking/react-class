const { Router } = require("express");
const {
  AddRideFunction,
  GetRidesFunction,
  GetRideByIDFunction,
  AddRiderFunction,
  GetRidersFunction,
  GetRiderByIDFunction,
  AddFeedbackFunction,
  GetFeedbacksFunction,
  GetTripByRiderFunction,
  UpdateRideStatusFunction,
} = require("./rides-controller");
const routes = Router();

routes.post("/add-ride", AddRideFunction);
routes.post("/add-rider", AddRiderFunction);
routes.get("/get-rides", GetRidesFunction);
routes.get("/get-ride-id", GetRideByIDFunction);
routes.get("/get-riders", GetRidersFunction);
routes.get("/get-rider-id", GetRiderByIDFunction);
routes.post("/update-ride-status", UpdateRideStatusFunction);
routes.post("/add-ride-feedback", AddFeedbackFunction);
routes.get("/get-ride-feedbacks", GetFeedbacksFunction);
routes.get("/get-trip-by-rider", GetTripByRiderFunction);

module.exports = routes;
