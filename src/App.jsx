import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
  };
  const getCardImage = (name, suit) => {
    let cardCode = name;
    name === "10" ? (cardCode = "0") : (cardCode = name);
    return `https://deckofcardsapi.com/static/img/${cardCode[0]}${suit[0]}.png`;
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

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h2>React High Card 🚀</h2>
        <div className="cards-display">{currCardElems}</div>
        <br />
        <button onClick={dealCards}>Deal</button>
      </div>
    </>
  );
}

export default App;
