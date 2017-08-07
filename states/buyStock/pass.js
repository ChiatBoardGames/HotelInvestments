
import Immutable from 'immutable';

export default function pass(game) {
  return Immutable(game).setIn(['state', 0], {
    activePlayer: game.state[0].activePlayer,
    state: 'endTurn',
  });
}
