import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            const filter = action.payload
            state.filter = filter
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer