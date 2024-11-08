import { calculateScore, getCardRank, getSuitRank } from "./cardHelpers";

const determineWinner = () => {
  const playerScore = calculateScore(currCards);
  const botScoreVal = calculateScore(botCards);
  if (playerScore > botScoreVal) return playerWin();
  if (botScoreVal > playerScore) return "Bot wins!";

  // If scores are equal, check card count first
  if (currCards.length < botCards.length) return playerWin();
  if (botCards.length < currCards.length) return "Bot wins!";

  // If card count is also equal, check card ranks and suits
  const playerHighestRank = Math.max(
    ...currCards.map((card) => getCardRank(card.name))
  );
  const botHighestRank = Math.max(
    ...botCards.map((card) => getCardRank(card.name))
  );
  if (playerHighestRank > botHighestRank) return playerWin();
  if (botHighestRank > playerHighestRank) return "Bot wins!";

  // If ranks are equal, check if any cards have same suit
  const playerSameSuit = currCards.every(
    (card) => card.suit === currCards[0].suit
  );
  const botSameSuit = botCards.every((card) => card.suit === botCards[0].suit);
  if (playerSameSuit && !botSameSuit) return playerWin();
  if (botSameSuit && !playerSameSuit) return "Bot wins!";

  // If both have same suit or neither has same suit, compare highest suit
  const playerHighestSuit = Math.max(
    ...currCards.map((card) => getSuitRank(card.suit))
  );
  const botHighestSuit = Math.max(
    ...botCards.map((card) => getSuitRank(card.suit))
  );
  if (playerHighestSuit > botHighestSuit) return playerWin();
  if (botHighestSuit > playerHighestSuit) return "Bot wins!";

  return "It's a tie!";
};
