
import Immutable from 'immutable';

export default function onEnter(game) {
  return Immutable(game).setIn(['state', 0, 'canBuyMore'], 3);
}
