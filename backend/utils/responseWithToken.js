const jsonWebToken = require("../api/jsonWebToken");

exports.responseWithToken = (res, data, minutesToExpire) => {
console.log('minutesToExpire :', minutesToExpire);

const expiresIn = minutesToExpire+"m";
console.log('expiresIn :', expiresIn);

    const token = jsonWebToken.createToken(data, expiresIn);
    console.log('data :', data);

    const cookiesOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + minutesToExpire * 60 * 1000)
        
    };
    console.log('cookiesOptions.expires :', cookiesOptions.expires);

    res.cookie("loginVerification", token)

    res.status(200).json(data);
    
}