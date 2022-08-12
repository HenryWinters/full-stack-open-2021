import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (anecdote, id) => { 
        dispatch(addVoteTo(id))
        dispatch(setNotification(`You voted for "${anecdote}"`))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
    }

    return (
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.content, anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

export default AnecdoteList 

