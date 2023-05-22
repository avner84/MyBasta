import { useState } from 'react';
import EditingDetailsForm from '../components/forms/EditingDetailsForm'
import SuccessEditing from '../components/success/SuccessEditing';
import './EditingDetailsPage.css'



const EditingDetailsPage = () => {

  const [success, setSuccess] = useState(false);

  return (success ?
    <SuccessEditing />
    :
    <EditingDetailsForm setSuccess={setSuccess} />

  )
}

export default EditingDetailsPage