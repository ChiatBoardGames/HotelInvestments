
import Immutable from 'immutable';
import Error from 'error';
import logger from 'core/utils/logger';
import {
  findNeighbors,
  placeTile,
  placeTiles,
} from 'utils/functions'; 
import _ from 'lodash';

export default function selectTile(game, playerId, {tile}) {
  game = Immutable(game);
  const index = _.findIndex(game.players[playerId].tiles, ([x, y])=> {
    return x === tile[0] && y === tile[1];
  });
  if(index !== -1) {
    game = game.updateIn(['players', playerId, 'tiles'], tiles=> {
      return tiles.slice(0, index).concat(tiles.slice(index + 1));
    });
  } else {
    throw new Error('InvalidTile');
  }
  const [neighbors, [emptyNeighbor]] = findNeighbors(game.board, tile);
  if(neighbors.length === 0 && !emptyNeighbor) {
    return game
    .setIn(['state', 0, 'state'], 'buyStock')
    .update('board', board=> placeTile(board, tile, -1));
  } else if(neighbors.length === 0 && emptyNeighbor) {
    const [mergeWith, neighbors] = emptyNeighbor;
    if(game.chains && _.sum(_.map(game.chains, chain => chain > 0 ? 1 : 0)) >= 7) {
      throw new Error('NoValidChain');
    }
    return game.update('state', state=> {
      return state
      .concat([{
        neighbors: neighbors.concat([tile]),
        state: 'selectChain',
        nextState: 'createChain',
        activePlayer: state[0].activePlayer,
        availableChains: _.times(7, _.identity).filter(i=> !game.chains[i]),
      }]);
    });
  } else if(neighbors.length === 1) {
    const largeChain = neighbors[0][0];
    const emptyNeighbors = _.get(emptyNeighbor, 1, []);
    return game
    .update('board', board=> placeTiles(board, [tile].concat(emptyNeighbors), largeChain))
    .updateIn(['chains', largeChain], tc=> tc + emptyNeighbors.length + 1)
    .setIn(['state', 0, 'state'], 'buyStock')
  } else {
    const merging = _.map(neighbors, 0);
    const competingChains = merging.map(chain=> ({chain, tileCount: game.chains[chain]}));
    const maxTiles = _(competingChains).map('tileCount').max();
    const largerChains = competingChains.filter(({tileCount})=> tileCount === maxTiles);
    if(maxTiles >= 11 && competingChains.filter(({tileCount})=> tileCount >= 11).length > 1) {
      throw new Error('ChainsSafe');
    }
    if(largerChains.length > 1) {
      return game
      .update('state', state=> state.concat([{
        activePlayer: state[0].activePlayer,
        mergingChains: merging,
        state: 'selectChain',
        nextState: 'merging',
        availableChains: _.map(largerChains, 'chain'),
        tile,
      }]));
    } else {
      return game
      .update('state', state=> state.concat([{
        activePlayer: state[0].activePlayer,
        state: 'merging',
        selectedChain: largerChains[0].chain,
        mergingChains: merging,
        tile,
      }]));
    }
  }
}

