import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [score, setScore] = useState(0);
  const [canDrawExtra, setCanDrawExtra] = useState(false);
  const [botScore, setBotScore] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  const calculateScore = (cards) => {
    const values = cards.map((card) => {
      if (card.name === "Ace") return 1;
      if (["King", "Queen", "Jack"].includes(card.name)) return 10;
      return parseInt(card.name);
    });

    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum % 10;
  };

  const getSuitRank = (suit) => {
    const ranks = { Spades: 4, Hearts: 3, Diamonds: 2, Clubs: 1 };
    return ranks[suit];
  };

  const getCardRank = (name) => {
    const ranks = { Ace: 5, King: 4, Queen: 3, Jack: 2 };
    return ranks[name] || 1;
  };

  const determineWinner = () => {
    const playerScore = calculateScore(currCards);
    const botScoreVal = calculateScore(botCards);
    if (playerScore > botScoreVal) return "Player wins!";
    if (botScoreVal > playerScore) return "Bot wins!";

    // If scores are equal, check card count first
    if (currCards.length < botCards.length) return "Player wins!";
    if (botCards.length < currCards.length) return "Bot wins!";

    // If card count is also equal, check card ranks and suits
    const playerHighestRank = Math.max(
      ...currCards.map((card) => getCardRank(card.name))
    );
    const botHighestRank = Math.max(
      ...botCards.map((card) => getCardRank(card.name))
    );
    if (playerHighestRank > botHighestRank) return "Player wins!";
    if (botHighestRank > playerHighestRank) return "Bot wins!";

    // If ranks are equal, check if any cards have same suit
    const playerSameSuit = currCards.every(
      (card) => card.suit === currCards[0].suit
    );
    const botSameSuit = botCards.every(
      (card) => card.suit === botCards[0].suit
    );
    if (playerSameSuit && !botSameSuit) return "Player wins!";
    if (botSameSuit && !playerSameSuit) return "Bot wins!";

    // If both have same suit or neither has same suit, compare highest suit
    const playerHighestSuit = Math.max(
      ...currCards.map((card) => getSuitRank(card.suit))
    );
    const botHighestSuit = Math.max(
      ...botCards.map((card) => getSuitRank(card.suit))
    );
    if (playerHighestSuit > botHighestSuit) return "Player wins!";
    if (botHighestSuit > playerHighestSuit) return "Bot wins!";

    return "It's a tie!";
  };

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    const newBotCards = [cardDeck.pop(), cardDeck.pop()];
    console.log(...newCurrCards);
    console.log(...newBotCards);
    setBotCards(newBotCards);
    setCurrCards(newCurrCards);
    setScore(calculateScore(newCurrCards));
    setBotScore(calculateScore(newBotCards));
    setCanDrawExtra(true);
    setShowWinner(false);
  };

  const drawExtraCard = () => {
    if (currCards.length < 3) {
      const newCards = [...currCards, cardDeck.pop()];
      console.log(newCards);
      setCurrCards(newCards);
      setScore(calculateScore(newCards));
      setCanDrawExtra(false);

      // Bot's turn to decide
      const currentBotScore = calculateScore(botCards);
      if (currentBotScore < 5 && botCards.length < 3) {
        const newBotCards = [...botCards, cardDeck.pop()];
        setBotCards(newBotCards);
        setBotScore(calculateScore(newBotCards));
      }
      setShowWinner(true);
    }
  };

  const decideWinner = () => {
    const currentBotScore = calculateScore(botCards);
    if (currentBotScore < 5 && botCards.length < 3) {
      const newBotCards = [...botCards, cardDeck.pop()];
      setBotCards(newBotCards);
      setBotScore(calculateScore(newBotCards));
    }
    setCanDrawExtra(false);
    setShowWinner(true);
  };

  const getCardImage = (name, suit) => {
    let cardCode = name;
    name === "10" ? (cardCode = "0") : (cardCode = name);
    return `https://deckofcardsapi.com/static/img/${cardCode[0]}${suit[0]}.png`;
  };

  const checkNaturalWin = () => {
    return currCards.length === 2 && (score === 8 || score === 9);
  };

  const currCardElems = currCards.map(({ name, suit }) => (
    <div key={`${name}${suit}`} className="card-container">
      <img
        src={getCardImage(name, suit)}
        alt={`${name} of ${suit}`}
        className="card-image"
      />
    </div>
  ));

  const botCardElems = botCards.map(({ name, suit }) => (
    <div key={`${name}${suit}`} className="card-container">
      <img
        src={getCardImage(name, suit)}
        alt={`${name} of ${suit}`}
        className="card-image"
      />
    </div>
  ));

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <h2>React High Card 🚀</h2>
      <div className="card">
        <h3>Bot's Cards:</h3>
        <div className="cards-display" style={{ display: "flex", gap: "1rem" }}>
          {botCardElems}
        </div>
        <p>Bot's Score: {botScore}</p>
        <h3>Your Cards:</h3>
        <div className="cards-display" style={{ display: "flex", gap: "1rem" }}>
          {currCardElems}
        </div>
        <p>Your Score: {score}</p>
        {checkNaturalWin() && <p>Natural Win! (8 or 9)</p>}
        {showWinner && <h1>{determineWinner()}</h1>}
        <br />
        <button onClick={dealCards}>Deal</button>
        {canDrawExtra && currCards.length < 3 && (
          <>
            <button onClick={drawExtraCard}>Draw Extra Card</button>
            <button onClick={decideWinner}>Show Winner</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
