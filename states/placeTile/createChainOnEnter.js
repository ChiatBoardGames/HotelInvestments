
export default function createChainFactory({logger, Error, Immutable, functions}) {
  const {placeTiles} = functions;
  return function createChain(game) {
    game = Immutable(game);
    const state = game.state[game.state.length - 1];
    const chain = state.selectedChain;
    return game
    .updateIn(['players', state.activePlayer, 'portfolio', chain], (amount = 0)=> amount + 1)
    .update('board', board=> placeTiles(board, state.neighbors, chain))
    .update('state', state=> {
      return state.slice(0, 1).setIn([0, 'state'], 'buyStock');
    })
    .setIn(['chains', chain], state.neighbors.length);
  };
}
