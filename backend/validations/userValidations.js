const regexConstants = require('./regexConstants');

const validate_UserDetails = ( firstName, lastName, pwd)=>{
  if (!regexConstants.FIRST_NAME_REGEX.test(firstName)) {
    return 'שם פרטי לא תקין';
}
if (!regexConstants.LAST_NAME_REGEX.test(lastName)) {
    return 'שם משפחה לא תקין';
}

if (!regexConstants.PASSWORD_REGEX.test(pwd)) {
    return  'סיסמה לא תקינה';
}
return null;
}

const validUserEmail = (email)=>{
    if (typeof email !== 'string' || email.trim().length === 0) {
      return 'ה-email אינו תקין';
    }
    return null;
  }

  module.exports = {
    validUserEmail, validate_UserDetails
  };