
import {toNextPlayer} from 'utils/mergingUtils';

export default function pass(game, playerId) {
  return toNextPlayer(game);
}
