
import {checkDoneMerging} from 'utils/mergingUtils';

export default function sell(game, playerId) {
  const {chain, stockPrice} = game.state[game.state.length - 1];
  game.players[playerId].portfolio[chain]--;
  game.players[playerId].score += stockPrice;
  game.bank[chain]++;
  return checkDoneMerging(game);
}
