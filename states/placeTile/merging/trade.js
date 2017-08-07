
import Immutable from 'immutable';
import Error from 'error';
import _ from 'lodash';
import {checkDoneMerging} from 'utils/mergingUtils';

export default function trade(game, playerId) {
  game = Immutable(game);
  const {chain, tradeFor} = game.state[game.state.length - 1];
  if (game.bank[tradeFor] <= 0) {
    throw new Error('SoldOut');
  }
  game = game.updateIn(['bank', tradeFor], value => value - 1);
  game = game.updateIn(['bank', chain], value => value + 2);
  game = game.updateIn(['players', playerId, 'portfolio'], portfolio=> {
    if(portfolio[chain] < 2) {
      throw new Error('NotEnoughStock');
    }
    return portfolio.update(chain, s=> s - 2)
    .update(tradeFor, m=> m + 1);
  });
  return checkDoneMerging(game);
}
