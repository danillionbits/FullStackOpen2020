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

let token = null

export const setNotification = (notification, time) => {
  return async dispatch => {
    if (token !== null) clearTimeout(token)
    token = null
    token = setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)

    dispatch(addNotification(notification))
  }
}

export default notificationReducer