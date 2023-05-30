import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { fetchProducts } from '../../redux/productsActions';
import {getCookie} from '../../api/CookiesMethodes';
import { PRODUCT_TֹTITLE_REGEX, PRODUCT_DESCRIPTION_REGEX, PRODUCT_PRICE_REGEX, PRODUCT_CATEGORY_REGEX } from '../../validation-forms/regexConstants';

const EDIT_PRODUCT_URL = '/api/products/editProduct';


const ProductEditingForm = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);
    const products = useSelector((state) => state.products.products);
    const product = products.find(item => item._id === params.id)

    const [productTitle, setProductTitle] = useState(product.title);
    const [validProductTitle, setvalidProductTitle] = useState(false);

    const [productDescription, setProductDescription] = useState(product.description);
    const [validProductDescription, setValidProductDescription] = useState(false);

    const [price, setPrice] = useState(product.price);
    const [validPrice, setValidPrice] = useState(false);

    const [category, setCategory] = useState(product.category);
    const [validCategory, setValidCategory] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        // Validate product title
        const result = PRODUCT_TֹTITLE_REGEX.test(productTitle)
        setvalidProductTitle(result);
    }, [productTitle])

    useEffect(() => {
        // Validate product description
        const result = PRODUCT_DESCRIPTION_REGEX.test(productDescription)
        setValidProductDescription(result);
    }, [productDescription])

    useEffect(() => {
        // Validate price
        const result = PRODUCT_PRICE_REGEX.test(price)
        setValidPrice(result);
    }, [price])

    useEffect(() => {
        // Validate category
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
        data.append('selerId', user._id);
        data.append('productId', product._id);
        data.append('file', e.target[4].files[0]);

        try {
            const loginVerificationToken = getCookie("loginVerification");
            const response = await axios.put(EDIT_PRODUCT_URL, data, {
                headers: {
                    'Content-Type': ' multipart/form-data',
                    Authorization: `Bearer ${loginVerificationToken}`
                }
            });
            console.log('Success:', response);
            // Reset form fields
            setProductTitle('');
            setProductDescription('');
            setPrice(0);
            setCategory('');
            e.target[4].value = null; //clear file input

            // Fetch updated products
            dispatch(fetchProducts());

            // Navigate to success page
            navigate("/productEditedSuccessfully");

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
                    <h2>עריכת מוצר</h2>
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
                        <input type="submit" value="ערוך מוצר" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEditingForm