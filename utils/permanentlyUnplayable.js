
export default function permFactory({_, functions}) {
  const {findNeighbors} = functions;
  return function isUnplayable(game, tile) {
    return _(findNeighbors(game.board, tile)[0])
    .map(0)
    .map(chain=> game.chains[chain])
    .filter(tileCount=> tileCount >= 11)
    .value()
    .length >= 2;
  };
}

permFactory.dependencies = ['functions'];

