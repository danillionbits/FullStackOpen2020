import React from 'react'

const Notification = ({ message, error }) => {
  if (message) {
    return (
      <div className={ error ? 'success':'error' }>
        {message}
      </div>
    )
  }
  return null
}

  export default Notification