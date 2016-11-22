
export default function afterEachFactory({Immutable}) {
  return function afterEach(game) {
    game = Immutable(game);
    const stateIndex = game.state.length - 1;
    const {chain, activePlayer} = game.state[stateIndex];
    if(!game.players[activePlayer].portfolio[chain] || game.state[activePlayer].passed) {
      const currentPlayer = game.state[0].activePlayer;
      game = game.updateIn(['state', stateIndex], state=> {
        return getNextPlayerForMerging(state.without('passed'), game, true);
      });
      if(!game.state[stateIndex].toReplace.length) {
        game = game.update('state', state=> state.slice(0, stateIndex));
      }
    }
    return game;
  };
}
