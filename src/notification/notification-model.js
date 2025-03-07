const supabase = require("../../config/supaconfig_index");
// const { verifyOtp } = require("./auth-controller");

//getting user by uuid from notification table
function fetch_notification_uuid_model(payload) {
  return supabase.from("notification").select("*").eq("to", payload);
}

//getting user by id from notification table
function fetch_notification_id_model(payload) {
  return supabase.from("notification").select("*").eq("id", payload);
}

function delete_notification_model(payload) {
  return supabase.from("notification").delete("*").eq("to", payload);
}
module.exports = {
  fetch_notification_uuid_model,
  fetch_notification_id_model,
  delete_notification_model,
};
