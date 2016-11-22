
export default function gameOverFactory({Immutable, functions, _}) {
  const {getStockInfo, rewardBonuses} = functions;
  return function gameOver(game) {
    return _.reduce(game.chains, (game, tileCount, chain)=> {
      const {stockPrice, majorityBonus, minorityBonus} = getStockInfo(chain, tileCount);
      return game.update('players', players=> {
        return rewardBonuses(players, chain, majorityBonus, minorityBonus)
        .map(player=> {
          const numStock = player.portfolio[chain];
          if(numStock) {
            return player.update('score', score=> score + numStock * stockPrice);
          } else {
            return player;
          }
        });
      });
    }, Immutable(game))
    .set('state', [{state: 'gameOver'}]);
  }
}
