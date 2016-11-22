
export default function buyStockFactory({Immutable, logger, Error, functions, _}) {
  const {getStockInfo} = functions;
  return function buyStock(game, playerId, {chain}) {
    game = Immutable(game);
    let player = game.players[playerId];
    const tileCount = game.chains[chain];
    if(!tileCount) {
      throw new Error('InvalidStock');
    }
    const {stockPrice} = getStockInfo(chain, tileCount);
    if(player.score < stockPrice) {
      throw new Error('NotEnoughMoney');
    }
    game = game.updateIn(['players', playerId], player=> {
      return player.update('score', score=> score - stockPrice)
      .updateIn(['portfolio', chain], amount=> (amount || 0) + 1);
    })
    .updateIn(['state', 0, 'canBuyMore'], canBuyMore=> canBuyMore - 1);
    if(!game.state[0].canBuyMore) {
      game = game.setIn(['state', 0], {
        activePlayer: game.state[0].activePlayer,
        state: 'endTurn',
      });
    }
    return game;
  }
}

