const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_VALIDITY = 24 * 60 * 60; // access token is valid 24 hour

/**
 * @private
 * @description Generate an access token token
 * @param {string} userId - The UserId.
 * @param {Array} scope - The scope.
 * @param {string} jwtSecret - JWT secret.
 * @example
 * const accessToken = generateAccessToken(
 *  '31a4d8d9-bf39-49be-8588-dac2b8cfa74a',
 *  ['dashboard:write', 'dashboard:read'],
 *  'secret'
 * );
 * @returns {string} Return accessToken.
 */
function generateAccessToken(userId, scope, jwtSecret) {
  return jwt.sign({ user_id: userId, scope }, jwtSecret, {
    algorithm: 'HS256',
    audience: 'user',
    issuer: 'gladys',
    expiresIn: ACCESS_TOKEN_VALIDITY,
  });
}

module.exports = {
  generateAccessToken,
};
