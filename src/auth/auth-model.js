const supabase = require("../../config/supaconfig_index");
const { verifyOtp } = require("./auth-controller");

function SignUp_public_model({ username, email, phone, uuid }) {
  return supabase
    .from("user_public")
    .insert([
      {
        username: username,
        email: email,
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

module.exports = {
  SignUp_public_model,
  SignUp_private_model,
};
