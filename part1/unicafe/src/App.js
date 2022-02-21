import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const all = good + neutral + bad
  const avg = ((good*1)+(bad*-1))/all 
  const positive = (good/all)*100+"%"

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)


  if (all === 0) {
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
            <p>No feedback given</p>
        </div> 
      )
  }

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
            <Statistics 
                text="good"
                count={good}
            />
            <Statistics 
                text="neutral"
                count={neutral}
            />
            <Statistics
                text="bad"
                count={bad}
            />
            <Statistics 
                text="all"
                count={all}
            />
            <Statistics
                text="average"
                count={avg}
            />
            <Statistics
                text="positive"
                count={positive}
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

const Statistics = ({text, count}) => (
    <p>{text} {count}</p>
)


export default App