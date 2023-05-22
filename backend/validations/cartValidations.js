const validateCart = (cartProducts, totalAmount, totalPrice, userId) => {

    if (!Array.isArray(cartProducts) && typeof cartProducts !== 'object') {
        return 'עדכון עגלת קניות במסד הנתונים נכשל: cartProducts אינו מערך או אובייקט';
    }
    if (typeof totalAmount !== 'number' || totalAmount < 0) {
        return 'עדכון עגלת קניות במסד הנתונים נכשל: totalAmount אינו מספר תקין או שהערך שלילי';
    }

    if (typeof totalPrice !== 'number' || totalPrice < 0) {
        return 'עדכון עגלת קניות במסד הנתונים נכשל: totalPrice אינו מספר תקין או שהערך שלילי';
    }

    if (typeof userId !== 'string' || userId.trim().length === 0) {
        return 'עדכון עגלת קניות במסד הנתונים נכשל: userId אינו מחרוזת תקינה';
    }
    return null;
} 
const validUserId = (userId)=>{
    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return 'ה-userId אינו תקין';
    }
    return null;
  }


module.exports = {validateCart, validUserId}