import { useState } from 'react'

const Button = (props) => <button onClick={props.handleclick}>{props.text}</button>

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const [selected, setSelected] = useState(0)

  const randomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const [maxVotes, setMaxVotes] = useState(0)

  const indexOfMax = (givenValue) => {
    let maxIndexTemp = selected;
    console.log(votes)
    console.log('current value', votes[maxIndexTemp])
    Object.entries(votes).forEach(([key, value]) => {
      if (givenValue < value) {maxIndexTemp = key}
    })

    return maxIndexTemp;
  }

  const increaseVote = () => {
    const copy = {...votes}
    const newValue = votes[selected] + 1
    copy[selected] = newValue
    setVotes(copy)
    const maxIndex = indexOfMax(newValue)
    setMaxVotes(maxIndex)
  }
  
  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>{'has'} {votes[selected]} {'votes'}</p>
      <Button handleclick={increaseVote} text='vote' />
      <Button handleclick={() => setSelected(randomNumber)} text='next' />
      <Header text='Anecdote with most votes' />
      <p>{anecdotes[maxVotes]}</p>
      <p>{'has'} {votes[maxVotes]} {'votes'}</p>
    </div>
  )
}

export default App