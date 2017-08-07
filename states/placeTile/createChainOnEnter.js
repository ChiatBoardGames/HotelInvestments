
import logger from 'core/utils/logger';
import Error from 'error';
import Immutable from 'immutable';
import {placeTiles} from 'utils/functions';

export default function createChain(game) {
  game = Immutable(game);
  const state = game.state[game.state.length - 1];
  const chain = state.selectedChain;
  const stockOffset = game.bank[chain] > 0 ? 1 : 0;
  return game
  .updateIn(['bank', chain], value => value - stockOffset)
  .updateIn(['players', state.activePlayer, 'portfolio', chain], (amount = 0)=> amount + stockOffset)
  .update('board', board=> placeTiles(board, state.neighbors, chain))
  .update('state', state=> {
    return state.slice(0, 1).setIn([0, 'state'], 'buyStock');
  })
  .setIn(['chains', chain], state.neighbors.length);
}
