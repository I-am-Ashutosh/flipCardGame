import React, { useCallback, useEffect, useState } from "react";
import styles from "./cardBoard.module.css";
import FlipCard from "./FlipCard";

const CardBoard = () => {
  const [letters, setLetters] = useState([]);
  const [firstFlip, setFirstFlip] = useState("");
  const [secondFlip, setSecondFlip] = useState(null);
  const [fliped, setFliped] = useState(false);
  const [totalTurns, setTotalTurns] = useState(0);

  const lettersList = [
    { name: "A", matched: false },
    { name: "Z", matched: false },
    { name: "G", matched: false },
    { name: "I", matched: false },
    { name: "E", matched: false },
    { name: "J", matched: false },
    { name: "G", matched: false },
    { name: "A", matched: false },
    { name: "I", matched: false },
    { name: "Z", matched: false },
    { name: "J", matched: false },
    { name: "E", matched: false },
  ];

  const handleCardFlip = (card) => {
    firstFlip ? setSecondFlip(card) : setFirstFlip(card);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const handleGameReset = useCallback(() =>{
    setLetters(shuffleArray(lettersList));
    setFirstFlip(null);
    setSecondFlip(null);
    setFliped(false);
    setTotalTurns(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    handleGameReset()
  }, [handleGameReset]);

  const resetValuesForNextTurn = () => {
    setFirstFlip(null);
    setSecondFlip(null);
    setFliped(false);
    setTotalTurns(prev => prev+1)
  };

  useEffect(() => {
    if (firstFlip && secondFlip) {
      setFliped(true);
      if (firstFlip.name === secondFlip.name) {
        setLetters((prev) => {
          return prev.map((v) => {
            if (v.name === firstFlip.name) {
              v.matched = true;
            }
            return v;
          });
        });
        resetValuesForNextTurn();
      } else {
        setTimeout(() => resetValuesForNextTurn(), 1000);
      }
    }
  }, [firstFlip, secondFlip]);

  return (
    <div className={styles.boardWrapper}>
      <button className={styles.startButton} onClick={handleGameReset}>
        Start New Game
      </button>
      <div className={styles.board}>
        <div className={styles.container}>
          {letters.map((letter, i) => (
            <FlipCard
              handleCardFlip={handleCardFlip}
              alreadyFlipped={fliped}
              clicked={
                letter === firstFlip || letter === secondFlip || letter.matched
              }
              key={i}
              letter={letter}
            />
          ))}
        </div>
      </div>
      <div className={styles.score}><b>Total Turns:</b>{totalTurns}</div>
    </div>
  );
};

export default CardBoard;
