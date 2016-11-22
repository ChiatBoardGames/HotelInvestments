
export default function selectChainFactory({Error, Immutable}) {
  return function selectChain(game, playerId, {chain}) {
    if(chain == null || chain < 0 || chain >= 7) {
      throw new Error('InvalidChain');
    }
    const stateIndex = game.state.length - 1;
    if(game.state[stateIndex].availableChains.indexOf(chain) === -1) {
      throw new Error('InvalidChain');
    }
    return Immutable(game)
    .updateIn(['state', stateIndex], state=> {
      return state.merge({
        selectedChain: chain,
        state: state.nextState,
      }).without(['nextState', 'availableChains']);
    });
  };
};
