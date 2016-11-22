
export default function isUnplayableFactory({permanentlyUnplayable, functions, _}) {
  const {findNeighbors} = functions;
  return function isUnplayable(game, tile) {
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
}

isUnplayableFactory.dependencies = ['permanentlyUnplayable', 'functions'];
