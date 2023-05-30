import { useState } from 'react';
import EditingDetailsForm from '../components/forms/EditingDetailsForm'
import SuccessEditing from '../components/success/SuccessEditing';
import './EditingDetailsPage.css'

/*
The EditingDetailsPage component represents a page for editing user details.

It uses the useState hook to manage the state of the 'success' variable, which determines whether the editing process was successful or not.

If 'success' is true, the SuccessEditing component is rendered, indicating that the editing was successful.
Otherwise, the EditingDetailsForm component is rendered, allowing the user to edit their details.

The setSuccess function is passed to the EditingDetailsForm component as a prop, allowing it to update the 'success' state when the editing is successfully completed.

*/

const EditingDetailsPage = () => {

  const [success, setSuccess] = useState(false);

  return (success ?
    <SuccessEditing />
    :
    <EditingDetailsForm setSuccess={setSuccess} />

  )
}

export default EditingDetailsPage