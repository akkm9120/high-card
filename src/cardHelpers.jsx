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
const getCardImage = (name, suit) => {
  let cardCode = name;
  name === "10" ? (cardCode = "0") : (cardCode = name);
  return `https://deckofcardsapi.com/static/img/${cardCode[0]}${suit[0]}.png`;
};
