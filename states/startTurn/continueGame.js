
export default function continueGame(game) {
  game.state[0].state = 'placeTile';
  return game;
}
