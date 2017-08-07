
import _ from 'lodash';

export default function soldOut(game, chain) {
  return _.sum(game.players, player=> player.portfolio[chain]) >= 25;
}
