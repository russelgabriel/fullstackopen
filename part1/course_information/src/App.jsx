import styled from 'styled-components'

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
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = ({ name }) => {
  return <StyledHeader>{name}</StyledHeader>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  let total = 0
  parts.forEach(part => {
    total += part.exercises
  })
  return <p>Number of exercises {total}</p>
}

const StyledHeader = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

export default App
