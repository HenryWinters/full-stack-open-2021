import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
        <Header 
            text="give feedback"
        />
        <Buttons 
            onClick={increaseGood}
            text="good"
        />
        <Buttons 
            onClick={increaseNeutral}
            text="neutral"
        />
        <Buttons 
            onClick={increaseBad}
            text="bad"
        />
        <Header 
            text="statistics"
        />
        <Display 
            text="good"
            count={good}
        />
        <Display 
            text="neutral"
            count={neutral}
        />
        <Display
            text="bad"
            count={bad}
        />
    </div>
  )
}

const Buttons = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Header = ({text}) => (
    <h1>{text}</h1>
)

const Display = ({text, count}) => {
    return (
         <p>{text} {count}</p>
    )
}


export default App