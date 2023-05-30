import React from 'react'

// Component for displaying the alert message when the account confirmation fails
const UnconfirmedAccountAlert = () => {
  return (
    <div className='form_container'>
    <div className='heading'>
        <h2>אימות החשבון נכשל</h2>
    </div>
    <div className='success_warp'>
        <h3 style={{color: "red"}}>לא הצלחנו לאמת את חשבונך</h3>
        <p>ייתכן והדבר נבע מהזמן שחלף בין ההרשמה לאימות. על מנת להתחבר לאתר עליך להירשם מחדש</p>                
    </div>
</div>
  )
}

export default UnconfirmedAccountAlert