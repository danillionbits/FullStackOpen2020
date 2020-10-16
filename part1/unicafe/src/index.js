import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let sum = good + bad + neutral

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}> good </button>
      <button onClick={() => setNeutral(neutral+1)}> neutral </button>
      <button onClick={() => setBad(bad+1)}> bad </button>
      
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum}</p>
      <p>average {(good - bad)/sum} </p>
      <p>positive {(good/sum)*100}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)