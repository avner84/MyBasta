const validateOrders = (orders, userId) => {
    if (!Array.isArray(orders) && typeof orders !== 'object') {
        return'עדכון ההזמנות במסד הנתונים נכשל: orders אינו מערך או אובייקט';
    }


    if (typeof userId !== 'string' || userId.trim().length === 0) {
        return 'עדכון ההזמנות במסד הנתונים נכשל: userId אינו מחרוזת תקינה';
    }
    return null;
} 


const validUserId = (userId)=>{
    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return 'ה-userId אינו תקין';
    }
    return null;
  }


module.exports = {validateOrders, validUserId}