const jwt = require("jsonwebtoken");

const jwtToken =
  "HzvvRBTwA2b7r93C9pkjtpzhqSiGmmPQR0XCDR5ZtLRs5wobF/V7k2iD1J3pNX3+lYBD9qFDsPX9hfvSNoXhdg==";

function responseObject(message, type, data) {
  return {
    success: type,
    message,
    data,
  };
}

const isTokenValid = (token, jwtSecret = jwtToken) => {
  try {
    //decode token
    const decodedToken = jwt.decode(token, { complete: true });

    //checking is token expired
    const expirationTime = decodedToken.payload.exp;

    // compare with current time
    const currentTime = math.floor(Date.now() / 1000);

    if (expirationTime > currentTime) {
      if (token) {
        jwt.verify(token, jwtSecret);
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = { responseObject, isTokenValid };
