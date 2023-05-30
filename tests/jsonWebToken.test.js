const { createToken, checkToken, decryptToken } = require('../backend/api/jsonWebToken');

describe('JSON Web Token', () => {
  describe('createToken', () => {
    it('should generate a valid JWT with the specified user object', () => {
      const user = { id: 1, username: 'john_doe' };
      const token = createToken(user, '1h');

      // Verify the token using your preferred method or library
      expect(token).toBeDefined();
      // Add more assertions to verify the token properties, expiration, etc.
    });
  });

  describe('checkToken', () => {
    it('should return true for a valid JWT', () => {
      const user = { id: 1, username: 'john_doe' };
      const token = createToken(user, '1h');
      const isValid = checkToken(token);

      expect(isValid).toBe(true);
    });

    it('should return false for an invalid JWT', () => {
      const invalidToken = 'invalid.token';
      const isValid = checkToken(invalidToken);

      expect(isValid).toBe(false);
    });
  });

  describe('decryptToken', () => {
    it('should return the user object from a valid JWT', () => {
      const user = { id: 1, username: 'john_doe' };
      const token = createToken(user, '1h');
      const decryptedUser = decryptToken(token);

      expect(decryptedUser).toEqual(user);
    });

    it('should throw an error for an invalid JWT', () => {
      const invalidToken = 'invalid.token';

      expect(() => {
        decryptToken(invalidToken);
      }).toThrow();
    });
  });
});
