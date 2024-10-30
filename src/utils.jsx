// Function to get a random index within a range
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Function to shuffle an array of cards using Fisher-Yates algorithm
const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

// Function to create a standard deck of 52 playing cards
const makeDeck = () => {
  const newDeck = [];
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let cardRank = rankCounter;

      if (cardName === "1") {
        cardName = "Ace";
        cardRank = 14;
      } else if (cardName === "11") {
        cardName = "Jack";
      } else if (cardName === "12") {
        cardName = "Queen";
      } else if (cardName === "13") {
        cardName = "King";
      }

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };

      newDeck.push(card);
    }
  }

  return newDeck;
};

// Helper function that combines deck creation and shuffling in one step
export const makeShuffledDeck = () => shuffleCards(makeDeck());
