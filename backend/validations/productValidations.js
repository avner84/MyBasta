const validateProduct = (title, description, price, category, selerId) => {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return 'כותרת המוצר חסרה או שהוזנה בפורמט לא תקין';
    }
  
    if (typeof description !== 'string' || description.trim().length === 0) {
      return 'תיאור המוצר חסר או שהוזן בפורמט לא תקין';
    }
  
    if ((typeof price !== 'number' && typeof price !== 'string') || parseFloat(price) <= 0) {
      return 'מחיר המוצר אינו תקין או שהוזן בפורמט שאינו תקני';
    }
  
    if (typeof category !== 'string' || category.trim().length === 0) {
      return 'קטגוריית המוצר חסרה או שהוזנה בפורמט לא תקין';
    }
  
    if (typeof selerId !== 'string' || selerId.trim().length === 0) {
      return 'ה-selerId אינו תקין';
    }
  
    return null;
  }

  const validProductId = (productId)=>{
    if (typeof productId !== 'string' || productId.trim().length === 0) {
      return 'ה-productId אינו תקין';
    }
    return null;
  }


 const validateEditProduct = (title, description, price, category, selerId) => {
  if (typeof title !== 'string' || title.trim().length === 0) {
    return 'כותרת המוצר חסרה או שהוזנה בפורמט לא תקין';
  }

  if (typeof description !== 'string' || description.trim().length === 0) {
    return 'תיאור המוצר חסר או שהוזן בפורמט לא תקין';
  }

  if ((typeof price !== 'number' && typeof price !== 'string') || parseFloat(price) <= 0) {
    return 'מחיר המוצר אינו תקין או שהוזן בפורמט שאינו תקני';
  }

  if (typeof category !== 'string' || category.trim().length === 0) {
    return 'קטגוריית המוצר חסרה או שהוזנה בפורמט לא תקין';
  }

  if (typeof selerId !== 'string' || selerId.trim().length === 0) {
    return 'ה-productId אינו תקין';
  }

  return null;
}

  
  module.exports = {
    validateProduct, validProductId, validateEditProduct
  };
  