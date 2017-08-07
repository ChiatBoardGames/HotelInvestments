
import {randomEntry} from 'core/utils/random';

export default function(game) {
  const state = game.state[game.state.length - 1];
  return {
    action: 'selectChain',
    input: {chain: randomEntry(state.availableChains)},
  };
}
