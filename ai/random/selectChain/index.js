
export default function({Random}) {
  return function(game) {
    const state = game.state[game.state.length - 1];
    return {
      action: 'selectChain',
      input: {chain: Random.randomEntry(state.availableChains)},
    };
  };
}
