import React from "react";
import styles from "./FlipCard.module.css";

const FlipCard = ({ letter, clicked, handleCardFlip, alreadyFlipped }) => {
  const handleCardClick = (letter) => {
    !alreadyFlipped && handleCardFlip(letter);
  }
  let flipEffect = clicked ? styles.clickedCard : "";
  return (
    <div
      className={styles.cardWrapper}
    >
      <div className={[styles.cardFront, flipEffect].join(' ')} 
      onClick={() => handleCardClick(letter)}
      >Flip it!</div>
      <p className={styles.letter}>{letter.name}</p>
    </div>
  );
};

export default FlipCard;
