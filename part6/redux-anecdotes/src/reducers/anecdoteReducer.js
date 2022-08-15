import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState, 
    reducers: {
        addVote(state, action) {
          const id = action.payload
          const anecdoteToAddVote = state.find(n => n.id === id)
          const anecdoteWithAdditionalVote = {
            ...anecdoteToAddVote, 
            votes: anecdoteToAddVote.votes + 1 
          }
          return state.map(anecdote => 
            anecdote.id !== id ? anecdote : anecdoteWithAdditionalVote)
        },
        createAnecdote(state, action) {
          return [...state, action.payload]
        },
        setAnecdotes(state, action) {
          return action.payload
        }
    }
})

export const { addVote, createAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdotesSlice.reducer