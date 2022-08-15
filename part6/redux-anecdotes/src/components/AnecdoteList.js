import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
  const filter = useSelector(state => state.filter.filter)
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  
  const vote = (anecdote) => { 
      dispatch(increaseVote(anecdote))
      dispatch(setNotification(`You voted for "${anecdote.content}"`))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList