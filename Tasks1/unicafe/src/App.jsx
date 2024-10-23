import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>

const Button = (props) => 
  <button onClick={props.handleclick}>
    {props.text}
  </button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const calculation = props.dividend / props.divisor
  if (props.percentage == '%') {
    return (
      <span>{(calculation*100).toFixed(1)} {props.percentage} </span>
    )
  } else {
  return (
   <span>{calculation.toFixed(1)} </span>
  )}
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const increaseGood = () => {
    setGood(good +1)
    setScore(score + 1)
    setTotal(total + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const increaseBad = () => {
    setBad(bad +1)
    setScore(score - 1)
    setTotal(total + 1)
  }
  if (total > 0) {
    return (
      <div>
        <Header text='give feedback' />
        <Button handleclick={increaseGood} text='good' />
        <Button handleclick={increaseNeutral} text='neutral' />
        <Button handleclick={increaseBad} text='bad' />
        <Header text='statistics' />
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={total} />
            <StatisticLine text='average' value={<Statistics dividend={score} divisor={total} />} />
            <StatisticLine text='positive' value={<Statistics dividend={good} divisor={total} percentage='%'/>}/>
          </tbody>
        </table>
      </div>
    )} else {
    return (
      <div>
        <Header text='give feedback' />
        <Button handleclick={increaseGood} text='good' />
        <Button handleclick={increaseNeutral} text='neutral' />
        <Button handleclick={increaseBad} text='bad' />
        <Header text='statistics' />
        <p>No feedback given</p>
      </div>  
    )};
}

export default App
