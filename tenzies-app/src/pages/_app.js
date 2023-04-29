import '@/styles/globals.css'
import Die from './components/Die'
import Data from './components/Data'
import { formatTime } from './components/utils'
import { useEffect, useState, useRef } from 'react';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {

  const [modalIsOpen, setIsOpen] = useState(false)
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [gameStarted, setGameStarted] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (gameStarted) {
      setTime(new Date().getTime())
    } else {
      setTime(prevTime => {
        return new Date().getTime() - prevTime
      })
    }
  }, [gameStarted])
  

  const score = useRef(0);
  const scoreText = useRef('')

  score.current = time
  scoreText.current = formatTime(time)

  useEffect(() => {
    openModal()
    setGameStarted(false)
  }, [tenzies])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map( die => {
      return die.id === id ?
          {...die, isHeld: !die.isHeld} :
          die
    }))
    
  }
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true);      
    }
  }, [dice])

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)

    setTenzies(false)
    score.current = -1; 
    scoreText.current = ''
  }

  const diceElements = dice.map(die => <Die 
                                        key={die.id} 
                                        value={die.value} 
                                        isHeld={die.isHeld}
                                        holdDice={() => holdDice(die.id)}
                                        gameStarted={gameStarted}
                                        setGameStarted={setGameStarted}
                                        />)  

  function rollDice() {
    if (!tenzies) {
        setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
        die :
        generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>

      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>

      {tenzies && <Data elapsedTime={scoreText.current} />}
      
    </main>
  )
}
