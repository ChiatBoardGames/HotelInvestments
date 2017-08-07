
import Immutable from 'immutable';
import _ from 'lodash';

export function checkDoneMerging(game) {
  if(!game.players[game.state[1].activePlayer].portfolio[game.state[1].chain]) {
    return toNextPlayer(game);
  } else {
    return game;
  }
}

export function toNextPlayer(game) {
  game = Immutable(game);
  const state = game.state[1];
  if(state.players.length > 1) {
    return game.setIn(['state', 1, 'activePlayer'], state.players[1])
    .updateIn(['state', 1, 'players'], players=> players.slice(1));
  } else if(state.replacing.length) {
    return game
    .updateIn(['state', 1], state=> {
      return state.merge(_.omit(state.replacing[0], 'players'))
      .set('activePlayer', state.replacing[0].players[0])
      .set('players', state.replacing[0].players.slice(1))
      .set('replacing', state.replacing.slice(1));
    });
  } else {
    return game.set('state', [{
      state: 'buyStock',
      activePlayer: game.state[0].activePlayer,
    }]);
  }
}
