

const validUserEmail = (email)=>{
    if (typeof email !== 'string' || email.trim().length === 0) {
      return 'ה-email אינו תקין';
    }
    return null;
  }

  module.exports = {
    validUserEmail
  };