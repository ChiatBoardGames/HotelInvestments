
import Immutable from 'immutable';
import {shuffle} from 'core/utils/random';
import _ from 'lodash';
import {
  placeTile,
  placeTiles,
} from 'utils/functions';
import gameLog from 'core/utils/game-log';

export default function initialize(game) {
  game = Immutable(game);
  const rows = 9;
  const cols = 12;
  let tiles = shuffle(_.flatten(_.times(rows, i=> {
    return _.times(cols, j=> [i, j]);
  })));

  const toPlace = tiles.slice(0, game.players.length);
  tiles = tiles.slice(game.players.length);

  gameLog.push({
    action: 'startingGame',
  });

  return game
  .set('rows', rows)
  .set('cols', cols)
  .set('bank', _.mapValues(_.times(7, () => 25)))
  .update('players', players=> {
    return Immutable(shuffle(players.map(({_id})=> {
      const playerTiles = tiles.slice(0, 6);
      tiles = tiles.slice(6);
      return Immutable({
        _id,
        score: 6000,
        tiles: playerTiles,
      });
    }).asMutable()));
  })
  .set('tiles', tiles)
  .set('chains', {})
  .set('board', placeTiles(Immutable({}), toPlace, -1))
  .set('state', [{
    activePlayer: 0,
    state: 'placeTile',
  }]);
}

