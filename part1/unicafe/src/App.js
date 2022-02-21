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
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                avg={avg}
                positive={positive}
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

const StatisticLine = ({text, count}) => {
    return ( 
    <tr>
        <td>{text}</td>
        <td> {count}</td>
    </tr>
)
}

const Statistics = ({good, neutral, bad, all, avg, positive}) => {
    if (all === 0) {
        return ( 
            <div> 
                No feedback given
            </div>
        )
    }

    return (
        <table> 
            <tbody>
                <StatisticLine 
                    text="good"
                    count={good}
                />
                <StatisticLine
                    text="neutral"
                    count={neutral}
                />
                <StatisticLine
                    text="bad"
                    count={bad}
                />
                <StatisticLine
                    text="all"
                    count={all}
                />
                <StatisticLine
                    text="average"
                    count={avg}
                />
                <StatisticLine
                    text="positive"
                    count={positive}
                />
            </tbody> 
        </table>
    )
}

export default App