import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';

import { useSelector } from "react-redux";
import {  loginSuccess } from '../../redux/userSlice';
import DeleteAccountModal from '../DeleteAccountModal'
import { FIRST_NAME_REGEX, LAST_NAME_REGEX, PWD_REGEX } from '../../validation-forms/regexConstants';
import {getCookie} from '../../api/CookiesMethodes';


const EDITING_URL = '/api/user/editing';

const EditingDetailsForm = ({ setSuccess }) => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser);
    
    const email = user?.email ?? '';

    
    const [firstName, setFirstName] = useState(user.name.firstName);
    const [validFirstName, setvalidFirstName] = useState(true);

    const [lastName, setLastName] = useState(user.name.lastName);
    const [validLastName, setValidLastName] = useState(true);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const result = FIRST_NAME_REGEX.test(firstName)
        setvalidFirstName(result);
    }, [firstName])

    useEffect(() => {
        const result = LAST_NAME_REGEX.test(lastName)
        setValidLastName(result);
    }, [lastName])


    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, pwd, matchPwd])

    const hundlesubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = FIRST_NAME_REGEX.test(firstName);
        const v2 = LAST_NAME_REGEX.test(lastName);
        const v3 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3) {
            setErrMsg("כניסה לא חוקית");
            return;
        }
        try {
            const loginVerificationToken = getCookie("loginVerification");
            const response = await axios.put(EDITING_URL,
                JSON.stringify({ firstName, lastName, email, pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${loginVerificationToken}`
                      },
                    withCredentials: true
                }
            );
            
            console.log(JSON.stringify(response))
            dispatch(loginSuccess(response?.data));
            setSuccess(true);
            
            
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('אין תשובה מהשרת');
            }

            else if (err.response?.status === 400) {
                setErrMsg('לפחות אחד השדות שהוזנו לא הוזן באופן תקין');
            }

            else if (err.response?.status === 401 ||err.response?.status === 403) {
                setErrMsg('שגיאה בהרשאות משתמש. יש להתנתק ולהתחבר מחדש למערכת');
            }
            else {
                setErrMsg('עדכון הפרטים נכשל')
            }

        }
    }

    
    const hundleDeleteAccountModal = () =>{
        setShowDeleteModal(true)
    }

    return (
        showDeleteModal?
        <DeleteAccountModal setShowDeleteModal={setShowDeleteModal}/>
        :
        (<div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>עריכת פרטי משתמש</h2>
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
                        <input type="submit" value="עדכן" disabled={!validFirstName || !validLastName || !validPwd || !validMatch ? true : false} />
                    </div>
                    <div className='fogate_pass_wrap deleteUserAccountBtn_warp'>
                        <input className="deleteUserAccountBtn" type="button" value="מחק חשבון משתמש" onClick={hundleDeleteAccountModal}/>
                    </div>

                </form>
            </div>
        </div>)
        )
      
}

export default EditingDetailsForm