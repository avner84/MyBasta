const jsonWebToken = require("../api/jsonWebToken");

exports.checkAuthHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (jsonWebToken.checkToken(token)) {           
            res.locals.token = token;             
            
            return next();
        } else {
            return res.status(403).send('Unauthorized');
        }
    } else {
        return res.status(401).send('Missing Authorization header');
    }
};