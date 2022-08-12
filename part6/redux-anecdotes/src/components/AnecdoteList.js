import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => b.votes - a.votes))
    const filter = useSelector(state => state.filter.filter)
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
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
        {filteredAnecdotes.map(anecdote =>
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

