const { response } = require("express");

const { responseObject } = require("../utility");
const { fetch_user_uuid_model } = require("../auth/auth-model");
const { fetch_notification_uuid_model } = require("./notification-model");

const AllNotificationsFunction = (req, res) => {
  let { user } = req.body;

  fetch_notification_uuid_model(user)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send("invalid phone");
      }

      let notifications = response.data;
      return res.send(responseObject("all notifications", true, notifications));
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });
};

module.exports = { AllNotificationsFunction };
