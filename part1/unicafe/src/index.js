import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={total} />
      <Statistic text="average" value={(good - bad)/total} />
      <Statistic text="positive" value={(good/total)*100} />
    </div>
  )
}

const Statistic = ({ text, value }) => (
  <p>{text} {value}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text='good' /> 
      <Button onClick={() => setNeutral(neutral+1)} text='neutral'/>
      <Button onClick={() => setBad(bad+1)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)