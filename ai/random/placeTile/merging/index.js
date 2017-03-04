
export default function({soldOut, Random}) {
  return function(game, playerId) {
    const myPlayer = game.players[playerId];
    const options = ['sell', 'trade'];
    const canTrade = myPlayer.portfolio[state.chain] >= 2 && !soldOut(game, state.tradeFor);
    return {
      action: canTrade ? Random.randomEntry(options) : 'sell',
    };
  }
}
