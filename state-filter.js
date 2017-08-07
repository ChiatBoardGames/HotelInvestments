
export default function stateFilter(game, playerId) {
  delete game.tiles;
  game.players.forEach((player, index) => {
    if (index !== playerId) {
      delete player.tiles;
    }
    if (game.hiddenStock) {
      delete player.portfolio;
    }
    if (game.hiddenMoney) {
      delete player.score;
    }
  });
  const state = game.state[game.state.length - 1];
  if (state.state === 'merging' && game.hiddenStock) {
    delete state.players;
  }
  return game;
}