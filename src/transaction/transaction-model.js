const supabase = require("../../config/supaconfig_index");

function fetch_user_uuid_model(payload) {
  return supabase.from("user_public").select("*").eq("uuid", payload);
}

function InsertNotification(payload) {
  return supabase
    .from("notification")
    .insert({
      from: payload.from,
      to: payload.to,
      type: payload.type,
      message: payload.message,
      meta_data: payload,
    })
    .select();
}

module.exports = { fetch_user_uuid_model, InsertNotification };
