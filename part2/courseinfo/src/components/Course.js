import React from 'react'

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => (
  parts.map( part => 
    <Part name={part.name} exercises={part.exercises} />
  )
)

const Total = ({ parts }) => (
  <p><b>
    total of { parts.map(part => part.exercises).reduce((a, b) => a + b) } exercises
  </b></p>
)

const Course = ( {course} ) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course