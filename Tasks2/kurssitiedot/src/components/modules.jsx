const Header = (props) => {
    console.log('Header props:',props)
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  
const Total = (props) => {
console.log('Total props:', props.sum)
return (
    <div>
    <p><strong>Total number of exercises:  {props.sum.reduce((a, b) => a + b.exercises, 0)}</strong></p>
    </div>
)
}

const Course = (props) => {
return (
    <p>{props.part} {props.exercises}</p>
)
}

export { Course, Header, Total }