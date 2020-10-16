import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ( { onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes ] = useState(new Array(props.anecdotes.length).fill(0))
  const [topSelected, setTopSelected] = useState(selected)
  
  const setToAnecdotes = (anecdote) => {
    setSelected(anecdote)
  }

  const setToVotes = (anecdote) => {
    const votesCopy = [...votes]
    votesCopy[anecdote] += 1
    setVotes(votesCopy)
    
    if (votesCopy[selected] > votesCopy[topSelected]) {
      setTopSelected(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={() => setToVotes(selected)} text='vote' />
      <Button onClick={() => setToAnecdotes(Math.floor(Math.random() * anecdotes.length))} text='next anecdote' />

      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[topSelected]} votes ={votes[topSelected]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)