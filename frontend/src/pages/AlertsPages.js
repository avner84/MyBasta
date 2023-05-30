import React from 'react'

const AlertsPages = ({alert}) => {
    return (
        <div className="wrapper">
            {alert}
        </div>

    )
}

export default AlertsPages

// The AlertsPages component is responsible for displaying success and failure messages related to actions.

// This component receives an "alert" prop, which contains the message to be displayed.

// The message is rendered within a wrapper div with the "wrapper" class.
// The content of the message is inserted using the {alert} expression within the JSX.

// This component is used to show informative alerts to the user, indicating the success or failure of certain actions.