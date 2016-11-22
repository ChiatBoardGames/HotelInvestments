
export default function declareGameOverFactory({Immutable, functions, _}) {
  const {getStockInfo, rewardBonuses} = functions;
  return function declareGameOver(game) {
    game.state = [{state: 'endGame'}];
    return game;
  }
}
