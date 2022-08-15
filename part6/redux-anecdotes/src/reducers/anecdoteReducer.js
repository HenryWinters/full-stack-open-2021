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
        appendAnecdote(state, action) {
          return [...state, action.payload]
        },
        setAnecdotes(state, action) {
          return action.payload
        }
    }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const increaseVote = (anecdote) => {
  return async dispatch => {
    console.log(anecdote)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const votedAnecdote = await anecdoteService.incrementVote(updatedAnecdote)
    dispatch(addVote(votedAnecdote.id))
  }
}

export default anecdotesSlice.reducer