
import _ from 'lodash';

export default function getChainId(game, board, state, tile) {
  if(state && state.neighbors) {
    const chain = _.find(_.get(game, ['state', 1, 'neighbors']), neighbor=> {
      return neighbor[0] === tile[0] && neighbor[1] === tile[1];
    });
    if(chain) {
      return -2;
    }
  }
  if(state && state.tile) {
    if(state.tile[0] === tile[0] && state.tile[1] === tile[1]) {
      return -2;
    }
  }
  return _.get(board, tile);
}

