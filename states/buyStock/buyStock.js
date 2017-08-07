
import Immutable from 'immutable';
import _ from 'lodash';
import logger from 'core/utils/logger';
import Error from 'error';
import {getStockInfo} from 'utils/functions';

export default function buyStock(game, playerId, {chain}) {
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
  if (game.bank[chain] <= 0) {
    throw new Error('NoneInStock');
  }
  game = game.updateIn(['players', playerId], player=> {
    return player.update('score', score=> score - stockPrice)
    .updateIn(['portfolio', chain], amount=> (amount || 0) + 1);
  })
  .updateIn(['bank', chain], value => value - 1)
  .updateIn(['state', 0, 'canBuyMore'], canBuyMore=> canBuyMore - 1);
  if(!game.state[0].canBuyMore) {
    game = game.setIn(['state', 0], {
      activePlayer: game.state[0].activePlayer,
      state: 'endTurn',
    });
  }
  return game;
}

