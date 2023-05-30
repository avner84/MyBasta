const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

/**
 * Creates a JSON Web Token (JWT) for the specified user.
 * @param {Object} user - The user object to be included in the token.
 * @param {string} expiresIn - (Optional) The expiration time for the token (default: "30m").
 * @returns {string} - The generated JWT.
 */
function createToken(user, expiresIn = "30m") {
  let token = jwt.sign({ user, iat: Math.floor(Date.now() / 1000) }, jwtSecretKey, { expiresIn });
  return token;
}

/**
 * Checks the validity of a JSON Web Token (JWT).
 * @param {string} token - The token to be checked.
 * @returns {boolean} - Returns true if the token is valid, otherwise false.
 */
function checkToken(token) {
  try {
    let decoded = jwt.verify(token, jwtSecretKey);
    return true;
  } catch (err) {
    return false;
    // err
  }
}

/**
 * Decrypts a JSON Web Token (JWT) and retrieves the user object.
 * @param {string} token - The token to be decrypted.
 * @returns {Object} - The decrypted user object.
 */
function decryptToken(token) {
  var decoded = jwt.verify(token, jwtSecretKey);  
  return decoded.user;
}

module.exports = { createToken, checkToken, decryptToken };
