const { request } = require("express");
const { responseObject } = require(".");

function fullNameValidation(name, res) {
  //check for name length
  if (name.length < 6) {
    return res.send(
      responseObject(
        "invalid fullname, full name must be more that 5",
        false,
        null
      )
    );
  }
  //check for first and last name
  if (name.split(" ").length < 2) {
    return res.send(
      responseObject(
        "invalid fullname, provide your first and last name",
        false,
        null
      )
    );
  }
}

function emailValidation(email, res) {
  if (email.length < 6 || !email.includes("@") || !email.includes(".")) {
    return res.send(
      responseObject("invalid email, provide your valid email", false, null)
    );
  }
}

function passwordValidation(password, res) {
  // checking password length
  if (password.length < 6) {
    return res.send(
      responseObject("invalid email, provide your valid email", false, null)
    );
  }
  // checking for numbers in password
  if (!/\d/.test(password)) {
    return res.send(
      responseObject("invalid password, Add at least one number", false, null)
    );
  }
  // checking for capital and small letters in password
  if (!/[A-Z]/.test(password)) {
    return res.send(
      responseObject(
        "invalid password, password should include both upper and lower case letters",
        false,
        null
      )
    );
  }

  // checking for special character in password
  if (!/[^A-Z0-9]/.test(password)) {
    return res.send(
      responseObject(
        "invalid password, password should include at least one special character",
        false,
        null
      )
    );
  }
}

function phoneNumberValidation(phone, res) {
  if (phone.length < 10) {
    return res.send(
      responseObject(
        "invalid phone number, phone Number should be atleast 10 characters long",
        false,
        null
      )
    );
  }
}

module.exports = {
  fullNameValidation,
  emailValidation,
  passwordValidation,
  phoneNumberValidation,
};
