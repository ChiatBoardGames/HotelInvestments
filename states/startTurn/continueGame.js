
export default function continueGameFactory() {
  return function continueGame(game) {
    game.state[0].state = 'placeTile';
    return game;
  };
}
