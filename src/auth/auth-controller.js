const { response } = require("express");
const { responseObject } = require("../utility");
const {
  emailValidation,
  fullNameValidation,
  passwordValidation,
  phoneValidation,
  phoneNumberValidation,
} = require("../utility/formValidation");
const { SignUp_public_model, SignUp_private_model } = require("./auth-model");
const { use } = require("./auth-routes");

const SignUpAuth = (req, res) => {
  let { username, email, password, phone } = req.body;

  // validating name
  // fullNameValidation(name, res);

  //validating Email
  emailValidation(email, res);

  //validating password
  passwordValidation(password, res);

  phoneNumberValidation(phone, res);

  //private signup
  let payload = { email, password };
  SignUp_private_model(payload).then((signUpResponse) => {
    if (signUpResponse.error) {
      return res.send(
        responseObject(signUpResponse.error.message, false, null)
      );
    }
    //public signup
    SignUp_public_model({
      username,
      email,
      phone,
      password,
      uuid: signUpResponse.data.user.id,
    })
      .then((response) => {
        if (response.error) {
          return res.send(responseObject(response.error.message, false));
        }
        res.send(
          responseObject("successful", true, {
            ...signUpResponse.data.user.user_metadata,
            accessToken: signUpResponse.data.session.access_token,
            UUID: signUpResponse.data.user.id,
            refreshToken: signUpResponse.data.session.refresh_token,
          })
        );
      })
      .catch((error) => {
        return res.send(responseObject());
      });
  });
};

module.exports = {
  SignUpAuth,
};
