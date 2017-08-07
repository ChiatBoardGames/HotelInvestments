
import soldOut from 'utils/soldOut';
import {randomEntry} from 'core/utils/random';

export default function merging(game, playerId) {
  const state = game.state[game.state.length - 1];
  const myPlayer = game.players[playerId];
  const options = ['sell', 'trade'];
  const canTrade = myPlayer.portfolio[state.chain] >= 2 && !soldOut(game, state.tradeFor);
  return {
    action: canTrade ? randomEntry(options) : 'sell',
  };
}
