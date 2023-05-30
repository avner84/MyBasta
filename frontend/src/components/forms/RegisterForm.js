
import { useState, useEffect } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import { FIRST_NAME_REGEX, LAST_NAME_REGEX, EMAIL_REGEX, PWD_REGEX } from '../../validation-forms/regexConstants';


const REGISTER_URL = '/api/auth/register';

const RegisterForm = ({ setSuccess }) => {

    // State variables for form inputs and validation
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setvalidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');


    // useEffect hooks for validating form inputs
    useEffect(() => {
        const result = FIRST_NAME_REGEX.test(firstName)
        setvalidFirstName(result);
    }, [firstName])

    useEffect(() => {
        const result = LAST_NAME_REGEX.test(lastName)
        setValidLastName(result);
    }, [lastName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, pwd, matchPwd])

    // Function to handle form submission
    const hundlesubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = FIRST_NAME_REGEX.test(firstName);
        const v2 = LAST_NAME_REGEX.test(lastName);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("כניסה לא חוקית");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ firstName, lastName, email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true); // When setSuccess receives true, the parent component (RegisterPage) will render the SuccessRegister component instead of the registration form
            
            // Clear form inputs and state variables
            setFirstName('');
            setLastName('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
            
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('אין תשובה מהשרת');
            }
            else if (err.response?.status === 409) {
                setErrMsg('כבר נרשם חשבון עם כתובת דוא"ל זו');
            }
            else if (err.response?.status === 400) {
                setErrMsg('לפחות אחד השדות שהוזנו לא הוזן באופן תקין');
            }
            else {
                setErrMsg('ההרשמה נכשלה')
            }

        }
    }

    return (
        <div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>צור חשבון</h2>
                </div>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <form onSubmit={hundlesubmit}>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="firstName">
                                שם פרטי:
                                <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                            />
                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="lastName">שם משפחה:
                                <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                            />
                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="email">כתובת דוא"ל:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required

                            />
                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="password">סיסמה:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <small >לפחות 6 תווים. אותיות (באנגלית) ומספרים</small>
                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="confirm_pwd">אימות סיסמה:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                            />
                        </div>
                    </div>
                    <div className="btn">
                        <input type="submit" value="צור" disabled={!validFirstName || !validLastName || !validEmail || !validPwd || !validMatch ? true : false} />
                    </div>
                    <div className='fogate_pass_wrap'>
                        <p>יש לך כבר חשבון? <Link to='/signin'>לחץ כאן</Link></p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default RegisterForm