import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => (
  <h1>{course.name}</h1>
)

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({parts}) => (
  parts.map( part => 
    <Part name={part.name} exercises={part.exercises} />
  )
)

const Total = ({parts}) => (
  <p>
    Number of exercises { parts.map(part => part.exercises).reduce((a, b) => a + b) }
  </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))