import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import { calculateScore, getCardImage } from "./cardHelpers.jsx";
import { determineWinner } from "./winnerLogic.jsx";

function App(props) {
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [score, setScore] = useState(0);
  const [canDrawExtra, setCanDrawExtra] = useState(false);
  const [botScore, setBotScore] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  const playerWin = () => {
    return (
      <div
        id="giphy"
        ref={(el) => el && el.scrollIntoView({ behavior: "smooth" })}
      >
        <iframe
          src="https://giphy.com/embed/jJQC2puVZpTMO4vUs0"
          width="480"
          height="398"
          style={{}}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
        <p>
          <i>You Win!!!</i>
        </p>
      </div>
    );
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

  const cardBack = `https://deckofcardsapi.com/static/img/back.png`;

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
        src={showWinner ? getCardImage(name, suit) : cardBack}
        alt={showWinner ? `${name} of ${suit}` : "???"}
        className="card-image"
      />
    </div>
  ));

  return (
    <>
      <h2>React High Card 🚀</h2>
      <div className="card">
        <h3>Bot's Cards:</h3>
        <div className="cards-display" style={{ display: "flex", gap: "1rem" }}>
          {botCardElems}
        </div>
        <p>Bot's Score: {showWinner ? botScore : ` You will never know..`}</p>

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
