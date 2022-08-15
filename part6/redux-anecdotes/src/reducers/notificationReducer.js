import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notification: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            state.notification = notification
        }
    }
})

export const { setNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (content, seconds) => {
    const milliseconds = seconds * 1000 
    return dispatch => {
      dispatch(setNotification(content))
      setTimeout(() => {
          dispatch(setNotification(null))
      }, milliseconds)
    }
  }

export default notificationSlice.reducer