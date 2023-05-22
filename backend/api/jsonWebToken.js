const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function createToken(user, expiresIn="30m") {
  let token = jwt.sign({ user, iat: Math.floor(Date.now() / 1000) }, jwtSecretKey, { expiresIn });
  return token;
}

function checkToken(token) {

  try {
    let decoded = jwt.verify(token, jwtSecretKey);

    return true;
  } catch (err) {
    return false;
    // err
  }

}

function decryptToken(token) {

  var decoded = jwt.verify(token, jwtSecretKey);  
  return decoded.user;

  // const tokenInformation = {}
  // jwt.verify(token, jwtSecretKey, function (err, decoded) {
  //   tokenInformation.user = decoded.user;
  //   tokenInformation.iat = decoded.iat;   
  // });

  // return tokenInformation;
}

module.exports = { createToken, checkToken, decryptToken }

