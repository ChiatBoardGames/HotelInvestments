
import Immutable from 'immutable';
import _ from 'lodash';

export default function onEnter(game) {
  let allSafe = game.chains && _.keys(game.chains).length && _.every(game.chains, tileCount=> tileCount >= 11);
  let canEnd = allSafe || _.find(game.chains, tileCount=> tileCount >= 41);
  if(!canEnd) {
    game.state[0].state = 'placeTile';
  }
  if(!game.players[game.state[0].activePlayer].tiles.length) {
    game.state = [{state: 'endGame'}];
  }
  return game;
}
