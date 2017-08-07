
import Immutable from 'immutable';
import {getStockInfo, rewardBonuses} from 'utils/functions';
import _ from 'lodash';

export default function gameOver(game) {
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
