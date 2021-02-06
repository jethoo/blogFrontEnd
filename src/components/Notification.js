import React from 'react'

const Notification = ({ errorMessage, successMessage }) => {
   
    return (
        <div>
            {(errorMessage == null && successMessage == null) ? null 
            : (errorMessage == null) ? <div className="success">{successMessage}</div>
            :  <div className="error">{errorMessage}</div>
            }
        </div>
    )   
}

export default Notification