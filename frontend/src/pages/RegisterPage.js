import { useState } from 'react';
import RegisterForm from '../components/forms/RegisterForm'
import SuccessRegister from '../components/success/SuccessRegister';
import './RegisterPage.css'

const RegisterPage = () => {

  const [success, setSuccess] = useState(false);

  return (    
      
      <>
      {success? <SuccessRegister/> : <RegisterForm setSuccess={setSuccess}/>}
      </>
      
  )
}

export default RegisterPage