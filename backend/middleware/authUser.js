const jsonWebToken = require("../api/jsonWebToken");


// Middleware to check the Authorization header for valid token
exports.checkAuthHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (jsonWebToken.checkToken(token)) {           
            res.locals.token = token;   // Store the token in res.locals for future use
                      
            
            return next(); // Proceed to the next middleware or route handler
        } else {
            return res.status(403).send('Unauthorized'); // Return 403 Forbidden if token is invalid
        }
    } else {
        return res.status(401).send('Missing Authorization header'); // Return 401 Unauthorized if Authorization header is missing
    }
};