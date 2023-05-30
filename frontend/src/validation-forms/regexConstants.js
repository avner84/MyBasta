// Regular expressions for user and product forms
// These regex patterns are used for user registration, profile editing,
// product upload, and product details editing.

export const FIRST_NAME_REGEX = /^[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30}$/;
export const LAST_NAME_REGEX = /^[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30}(\s[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30})?$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,24}$/;


export const PRODUCT_TֹTITLE_REGEX = /^[\u0590-\u05FF\s\w\d\p{P}\p{S}!._,-?]{1,50}$/;
export const PRODUCT_DESCRIPTION_REGEX = /^[\u0590-\u05FF\s\w\d\p{P}\p{S}!._,-?]{1,300}$/;
export const PRODUCT_PRICE_REGEX = /^[1-9]\d*$/;
export const PRODUCT_CATEGORY_REGEX = /^[א-ת ]{2,20}$/;