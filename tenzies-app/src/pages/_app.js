import '@/styles/globals.css'
import Die from './components/Die'
import Data from './components/Data'
import { useEffect, useState } from 'react';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [timeElapsing, setTimeElapsing] = useState(false)

  let t0 = null
  function startTime() {
    
      if (timeElapsing) {
        return t0 = Date.now()
      }
    
  }

  
  
  let elapsedTime = null;
  function stopTime() {
    elapsedTime = (Date.now() - startTime()) /1000
  }
  
  

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
      elapsedTime = (stopTime() - startTime()) / 1000
      
    }
  }, [dice])

  const diceElements = dice.map(die => <Die 
                                        key={die.id} 
                                        value={die.value} 
                                        isHeld={die.isHeld}
                                        holdDice={() => {
                                          holdDice(die.id);
                                          setTimeElapsing(true)
                                          startTime();
                                          }
                                        }
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

      {tenzies && <Data elapsedTime={elapsedTime} />}
      
    </main>
  )
}
