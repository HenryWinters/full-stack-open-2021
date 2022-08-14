import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const addVoteTo = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content, 
      id: getId(), 
      votes: 0
    }
  }
}

const initialState = []


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
        const id = action.id  
        const anecdoteToAddVote = state.find(n => n.id === id)
        const anecdoteWithAdditionalVote = {
          ...anecdoteToAddVote, 
          votes: anecdoteToAddVote.votes + 1
        }
        return state.map(anecdote => 
          anecdote.id !== id ? anecdote : anecdoteWithAdditionalVote)
    case 'NEW_ANECDOTE': 
        return [...state, action.data]
  }

  console.log('state now: ', state)
  console.log('action', action)

  return state
}

export default reducer*/

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
export default anecdotesSlice.reducer