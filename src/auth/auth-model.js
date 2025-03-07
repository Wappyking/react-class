const supabase = require("../../config/supaconfig_index");
const { verifyOtp } = require("./auth-controller");

function SignUp_public_model({ fullName, email, password, phone, data, uuid }) {
  return supabase
    .from("user_public")
    .insert([
      {
        name: fullName,
        email: email,
        data: { ...data, password },
        phone: phone,
        uuid: uuid,
      },
    ])
    .select();
}

function SignUp_private_model(payload) {
  return supabase.auth.signUp({
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    options: { data: payload.data },
  });
}

function login_model({ email, password }) {
  return supabase.auth.signInWithPassword({ email, password });
}

function fetch_user_public_model(payload) {
  return supabase
    .from("user_public")
    .select("*")
    .or(`email.eq.${payload}`, `phone.eq.${payload}`);
}

function otp_model(email, otpObj) {
  return supabase
    .from("user_public")
    .update({ otp: otpObj })
    .eq("email", email)
    .select();
}

function name_update_model(email, name, phone) {
  return supabase
    .from("user_public")
    .update({ name: name, phone: phone })
    .eq("email", email)
    .select();
}

function verify_otp_model(email) {
  return supabase.from("user_public").select("otp").eq("email", email);
}

//getting user by id from public table
function fetch_user_uuid_model(payload) {
  return supabase.from("user_public").select("*").eq("uuid", payload);
}

function getUserByIdPrivate(uuid) {
  return supabase.auth.admin.getUserById(uuid);
}

function fetch_user_phone_model(phone) {
  return supabase.from("user_public").select("*").eq("phone", phone);
}

function UpdataUserInfoModel({ uuid, data }) {
  return supabase.auth.admin.updateUserById(uuid, { user_metadata: data });
}

function delete_public_user_model(payload) {
  return supabase.from("user_public").delete().eq("uuid", payload);
}

function delete_private_user_model(payload) {
  return supabase.auth.admin.deleteUser(payload);
}

module.exports = {
  SignUp_public_model,
  SignUp_private_model,
  login_model,
  fetch_user_public_model,
  otp_model,
  verify_otp_model,
  name_update_model,
  fetch_user_uuid_model,
  getUserByIdPrivate,
  UpdataUserInfoModel,

  fetch_user_phone_model,
  delete_public_user_model,
  delete_private_user_model,
};
