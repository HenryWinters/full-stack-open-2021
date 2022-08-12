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
export default notificationSlice.reducer