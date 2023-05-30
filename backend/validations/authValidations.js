const regexConstants = require('./regexConstants');

const validateAuth = (firstName, lastName, lowerCaseEmail, pwd)=>{

 // Validate user inputs
 if (!regexConstants.FIRST_NAME_REGEX.test(firstName)) {
    return 'שם פרטי לא תקין';
}
if (!regexConstants.LAST_NAME_REGEX.test(lastName)) {
    return 'שם משפחה לא תקין';
}
if (!regexConstants.EMAIL_REGEX.test(lowerCaseEmail)) {
    return 'כתובת אימייל לא תקינה';
}
if (!regexConstants.PASSWORD_REGEX.test(pwd)) {
    return 'סיסמה לא תקינה';
}
return null;

}

 //Checking if the email address is from gmail and if so it checks if there are dots before the @ and removes them

function normalizeGmailEmail(email) {
    if (/@gmail/.test(email.toLowerCase())) {
        const [localPart, domain] = email.split('@');
        const normalizedLocalPart = localPart.replace(/\./g, '');
        return `${normalizedLocalPart}@${domain}`;
    }
    return email;
}


module.exports={validateAuth, normalizeGmailEmail}