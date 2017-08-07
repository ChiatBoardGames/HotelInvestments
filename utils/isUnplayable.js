
import permanentlyUnplayable from 'utils/permanentlyUnplayable';
import {findNeighbors} from 'utils/functions';
import _ from 'lodash';

export default function isUnplayable(game, tile) {
  const [neighbors, [emptyNeighbor]] = findNeighbors(game.board, tile);
  if(neighbors.length === 0 && emptyNeighbor && _.keys(game.chains).length === 7) {
    // You need to create a new chain, but there's no chain available
    return true;
  }
  if(permanentlyUnplayable(game, tile)) {
    // There are more than one safe chain, so they cannot be merged
    return true;
  }
  return false;
}
