const { response } = require("express");
const { responseObject } = require("../utility");

const {
  SignUp_public_model,
  SignUp_private_model,
  login_model,
  fetch_user_public_model,
  otp_model,
} = require("./auth-model");
const { use } = require("./auth-routes");

const LoginFunction = (req, res) => {
  let { email, password } = req.body;

  // validating Email
  // emailValidation(email, res);

  //validating password
  // passwordValidation(password, res);

  //feltching

  fetch_user_public_model(email)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false));
      }
      if (response.data.length < 1) {
        return res.send("invalid email");
      }

      let userData = response.data[0];
      let actualEmail = userData.email;
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });

  login_model({ email, password })
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false));
      }
      res.send(
        responseObject("successful", true, {
          ...response.data.user.user_metadata,
          accessToken: response.data.session.access_token,
          UUID: response.data.user.id,
          refreshToken: response.data.session.refresh_token,
        })
      );
    })
    .catch((error) => {
      return res.send(responseObject());
    });
};

const SignUpAuth = (req, res) => {
  let { fullName, email, password, data } = req.body;

  // validating name
  // fullNameValidation(name, res);

  //validating Email
  // emailValidation(email, res);

  //validating password
  // passwordValidation(password, res);

  // phoneNumberValidation(phone, res);

  //private signup
  let payload = { email, password, data: { wallet: 0 } };
  SignUp_private_model(payload).then((signUpResponse) => {
    if (signUpResponse.error) {
      return res.send(
        responseObject(signUpResponse.error.message, false, null)
      );
    }
    //public signup
    SignUp_public_model({
      fullName,
      email,
      password,
      data: { ...data, wallet: 0 },
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

const RequestOtp = (req, res) => {
  let { email } = req.body;

  fetch_user_public_model(email)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send("invalid email");
      }

      let userData = response.data[0];
      let actualEmail = userData.email;
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });

  function otp() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  var otpNumber = otp();
  var otpObj = { otpNumber, date: new Date().getTime() };

  otp_model(email, otpObj)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false));
      }
      res.send(responseObject("successful", true, response.data));
    })
    .catch((error) => {
      return res.send(responseObject());
    });
};

const verifyOtp = (req, res) => {
  let { email, otp } = req.body;
  fetch_user_public_model(email)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send("invalid email");
      }

      let userData = response.data[0];

      if (userData.otp.otpNumber != otp) {
        return res.send(responseObject("otp not correct", false, userData));
      }

      if (userData.otp.otpNumber == otp) {
        return res.send(responseObject("otp verified", true, userData));
      }
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });
};

module.exports = {
  LoginFunction,
  SignUpAuth,
  RequestOtp,
  verifyOtp,
};
