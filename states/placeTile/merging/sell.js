
export default function sellFactory({mergingUtils}) {
  const {checkDoneMerging} = mergingUtils;
  return function sell(game, playerId) {
    const {chain, stockPrice} = game.state[game.state.length - 1];
    game.players[playerId].portfolio[chain]--;
    game.players[playerId].score += stockPrice;
    return checkDoneMerging(game);
  };
}
