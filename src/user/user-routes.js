const { Router } = require("express");
const {
  Get_logged_in_user_controller,
  deleteUserFunction,
  photoUploadFunction,
} = require("./user-controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const routes = Router();

routes.get("/get-logged-in-user", Get_logged_in_user_controller);
routes.post("/delete-user", deleteUserFunction);
routes.post("/upload-photo", upload.single("file"), photoUploadFunction);

module.exports = routes;
