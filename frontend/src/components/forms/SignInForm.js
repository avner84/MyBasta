import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'

import { login } from "../../redux/authSlice";
import { loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';
import { setCartProducts } from '../../redux/cartSlice'
import {setOrders} from '../../redux/ordersSlice'
import axios from "../../api/axios";
import { FetchCartFromDB } from '../../api/FetchCartFromDB';
import {FetchOrdersFromDB} from '../../api/FetchOrdersFromDB';

const LOGIN_URL = '/api/auth/login'


const SignInForm = ({ loginHandler }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const hundlesubmit = async (e, history) => {
        e.preventDefault();
        dispatch(loginStart());
        try {

            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data));
            const user = response.data;
            console.log('user :', user);

            dispatch(login());
            dispatch(loginSuccess(user));

            setEmail('');
            setPwd('');
            navigate("/");
            const cartForReduxStore = await FetchCartFromDB(user._id);
            console.log('=========================');
            console.log('cartForReduxStore :', cartForReduxStore);
            dispatch(setCartProducts(cartForReduxStore))
            const ordersForReduxStore = await FetchOrdersFromDB(user._id);
            dispatch(setOrders(ordersForReduxStore));
        } catch (err) {


            if (!err?.response) {
                setErrMsg('אין תשובה מהשרת');
                dispatch(loginFailure('אין תשובה מהשרת'));
            }
            else if (err.response?.status === 400) {
                setErrMsg('כתובת הדוא"ל או הסיסמה חסרים');
                dispatch(loginFailure(err.response.data.error));
            }
            else if (err.response?.status === 401) {
                setErrMsg('החשבון לא אומת או שאחד הפרטים שהוזן שגוי');
                dispatch(loginFailure(err.response.data.error));

            }
            else if (err.response?.status === 404) {
                setErrMsg('חשבון זה אינו קיים יותר במערכת');
                dispatch(loginFailure(err.response.data.error));

            } else {
                setErrMsg('ההתחברות נכשלה')
                dispatch(loginFailure('ההתחברות נכשלה'));
            }
        }


    }

    return (
        <div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>התחבר לחשבון</h2>
                </div>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <form onSubmit={hundlesubmit}>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="email">כתובת דוא"ל:</label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="password">סיסמה:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                    </div>
                    <div className="btn">
                        <input type="submit" value="התחבר" />
                    </div>
                    <div className='fogate_pass_wrap'>
                        <p><Link >שכחת את הסיסמה?</Link></p>
                        <p>עוד אין לך חשבון? <Link to='/register'>לחץ כאן</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignInForm