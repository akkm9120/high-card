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

  const calculateScore = (cards) => {
    const values = cards.map((card) => {
      if (card.name === "Ace") return 1;
      if (["King", "Queen", "Jack"].includes(card.name)) return 10;
      return parseInt(card.name);
    });

    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum % 10;
  };

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    const newBotCards = [cardDeck.pop(), cardDeck.pop()];
    console.log(newCurrCards);
    console.log(newBotCards);
    setBotCards(newBotCards);
    setCurrCards(newCurrCards);
    setScore(calculateScore(newCurrCards));
    setBotScore(calculateScore(newBotCards));
    setCanDrawExtra(true);
  };

  const drawExtraCard = () => {
    if (currCards.length < 3) {
      const newCards = [...currCards, cardDeck.pop()];
      console.log(newCards);
      setCurrCards(newCards);
      setScore(calculateScore(newCards));
      setCanDrawExtra(false);
    }
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
        <br />
        <button onClick={dealCards}>Deal</button>
        {canDrawExtra && currCards.length < 3 && (
          <button onClick={drawExtraCard}>Draw Extra Card</button>
        )}
      </div>
    </>
  );
}

export default App;
