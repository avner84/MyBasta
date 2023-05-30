const jsonWebToken = require("../api/jsonWebToken");

exports.responseWithToken = (res, data, minutesToExpire) => {
console.log('minutesToExpire :', minutesToExpire);

const expiresIn = minutesToExpire+"m";
console.log('expiresIn :', expiresIn);

// Create a token with the provided data and expiration time
    const token = jsonWebToken.createToken(data, expiresIn);
    console.log('data :', data);

    const cookiesOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + minutesToExpire * 60 * 1000)
        
    };
    console.log('cookiesOptions.expires :', cookiesOptions.expires);

     // Set the "loginVerification" cookie with the generated token
    res.cookie("loginVerification", token)

    // Send the response with the provided data
    res.status(200).json(data);
    
}