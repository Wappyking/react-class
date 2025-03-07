const supabase = require("../../config/supaconfig_index");

const GetUserByAccessToken = (token) => {
  return supabase.auth.getUser(token);
};

// model to insert image
function InsertImageModel(payload) {
  return supabase.storage
    .from("public_bucket")
    .upload(payload.fileName, payload.formData);
}

module.exports = { GetUserByAccessToken, InsertImageModel };
