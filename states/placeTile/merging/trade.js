
export default function tradeFactory({Immutable, Error, _, mergingUtils}) {
  const {checkDoneMerging} = mergingUtils;
  return function trade(game, playerId) {
    game = Immutable(game);
    const {chain, tradeFor} = game.state[game.state.length - 1];
    game = game.updateIn(['players', playerId, 'portfolio'], portfolio=> {
      if(portfolio[chain] < 2) {
        throw new Error('NotEnoughStock');
      }
      if(_.sum(game.players, player=> player.portfolio[tradeFor]) >= 25) {
        throw new Error('SoldOut');
      }
      return portfolio.update(chain, s=> s - 2)
      .update(tradeFor, m=> m + 1);
    });
    return checkDoneMerging(game);
  };
}
