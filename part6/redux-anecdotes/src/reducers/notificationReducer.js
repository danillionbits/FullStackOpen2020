const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return ""
    default:
      return state
  }
}

const addNotification = notification => {
  return {
    type: 'ADD_NOTIFICATION',
    notification
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(addNotification(notification))

    setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
}

export default notificationReducer