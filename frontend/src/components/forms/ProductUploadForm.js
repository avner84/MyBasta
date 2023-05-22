//import './ProductUploadFormPage.css'
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { fetchProducts } from '../../redux/productsActions';

import {PRODUCT_TֹTITLE_REGEX, PRODUCT_DESCRIPTION_REGEX, PRODUCT_PRICE_REGEX, PRODUCT_CATEGORY_REGEX} from '../../validation-forms/regexConstants';

const  CREATE_PRODUCT_URL = '/api/products/createProduct';

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

const ProductUploadForm = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user= useSelector((state)=>state.user.currentUser);

    const [productTitle, setProductTitle] = useState('');
    const [validProductTitle, setvalidProductTitle] = useState(false);

    const [productDescription, setProductDescription] = useState('');
    const [validProductDescription, setValidProductDescription] = useState(false);

    const [price, setPrice] = useState(0);
    const [validPrice, setValidPrice] = useState(false);

    const [category, setCategory] = useState('');
    const [validCategory, setValidCategory] = useState(false);

    const [errMsg, setErrMsg] = useState(''); 

    useEffect(() => {
        const result = PRODUCT_TֹTITLE_REGEX.test(productTitle)
        setvalidProductTitle(result);
    }, [productTitle])

    useEffect(() => {
        const result = PRODUCT_DESCRIPTION_REGEX.test(productDescription)
        setValidProductDescription(result);
    }, [productDescription])

    useEffect(() => {
        const result = PRODUCT_PRICE_REGEX.test(price)
        setValidPrice(result);
    }, [price])

    useEffect(() => {
        const result = PRODUCT_CATEGORY_REGEX.test(category)
        setValidCategory(result);
    }, [category])

    const hundlesubmit = async (e) => {
        e.preventDefault();

         // if button enabled with JS hack
         const v1 = PRODUCT_TֹTITLE_REGEX.test(productTitle);
         const v2 = PRODUCT_DESCRIPTION_REGEX.test(productDescription);
         const v3 = PRODUCT_PRICE_REGEX.test(price);
         const v4 = PRODUCT_CATEGORY_REGEX.test(category);
         if (!v1 || !v2 || !v3 || !v4) {
             setErrMsg("אחד הפרטים שהוזנו לא עומד בכללי הפורמט");
             return;
         }

        
        const data = new FormData();        
        data.append('title', productTitle);
        data.append('description', productDescription);
        data.append('price', price);
        data.append('category', category);
        data.append('selerId', user._id)                
        data.append('file', e.target[4].files[0]);
        
        try {
           const loginVerificationToken = getCookie("loginVerification"); 
            const response = await axios.post(CREATE_PRODUCT_URL, data, {
                headers: { 
                    'Content-Type': ' multipart/form-data',
                    Authorization: `Bearer ${loginVerificationToken}`
                }
            });
            console.log('Success:', response);

            setProductTitle('');
            setProductDescription('');
            setPrice(0);
            setCategory('');
            e.target[4].value = null; //clear file input
            dispatch(fetchProducts());
            navigate("/ProductSuccessfullyAdded");

        } catch (err) {
            if (!err?.response) {
              setErrMsg('אין תשובה מהשרת');
                          
            } else if (err.response.status === 400) {
              setErrMsg(err.response.data);
              
            } else {
              setErrMsg('לא הצלחנו להעלות את המוצר. נסה להתנתק ולהתחבר מחדש.');
            }
        }
    }

    return (
        <div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>הוספת מוצר</h2>
                </div>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <form onSubmit={hundlesubmit}>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>
                                שם המוצר
                                <FontAwesomeIcon icon={faCheck} className={validProductTitle ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validProductTitle || !productTitle ? "hide" : "invalid"} />
                            </label>
                            <input
                                type='text'
                                onChange={(e) => setProductTitle(e.target.value)}
                                value={productTitle}
                                required />
                        </div>
                    </div>


                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>
                                תיאור המוצר
                                <FontAwesomeIcon icon={faCheck} className={validProductDescription ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validProductDescription || !productDescription ? "hide" : "invalid"} />
                            </label>
                            <textarea
                                name="product_description"
                                rows="4"
                                cols="50"
                                onChange={(e) => setProductDescription(e.target.value)}
                                value={productDescription}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>
                                מחיר (בשקלים)
                                <FontAwesomeIcon icon={faCheck} className={validPrice ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPrice || !price ? "hide" : "invalid"} />
                            </label>
                            <input type='number'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                required />
                        </div>
                    </div>

                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>
                                קטגוריה
                                <FontAwesomeIcon icon={faCheck} className={validCategory ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validCategory || !category ? "hide" : "invalid"} />
                            </label>
                            <select name='category'
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                required>
                                <option value=""></option>
                                <option>קרמיקה</option>
                                <option>תכשיטים</option>
                                <option>עץ</option>
                                <option>טקסטיל</option>
                                <option>זכוכית</option>
                                <option>הלבשה</option>
                                <option>ציור</option>
                                <option>כיסויי ראש</option>
                                <option>כיפות</option>
                                <option>יודאיקה</option>
                                <option>אחר</option>
                            </select>

                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>הוסף תמונה</label>
                            <input type='file'
                            required
                            />
                            <small>פורמטים תקינים לקבצי תמונה: PNG, JPEG, JPG ו-GIF.</small>
                        </div>
                    </div>


                    <div className="btn">
                        <input type="submit" value="הוסף" />
                    </div>
                </form>
            </div>
        </div>
    )
}



export default ProductUploadForm