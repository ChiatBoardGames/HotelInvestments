
export default function endTurnFactory({Immutable, _, functions, permanentlyUnplayable, isUnplayable}) {
  const {findNeighbors} = functions;
  return function endTurn(game) {
    let toDraw = 0;
    game = Immutable(game)
    .updateIn(['players', game.state[0].activePlayer, 'tiles'], tiles=> {
      tiles = tiles.filter(tile=> !permanentlyUnplayable(_, findNeighbors, game, tile));
      toDraw = Math.max(0, Math.min(6 - tiles.length, game.tiles.length));
      return tiles.concat(game.tiles.slice(0, toDraw));
    })
    .update('tiles', tiles=> tiles.slice(toDraw));

    const activePlayer = (game.state[0].activePlayer + 1) % game.players.length

    game = game.set('state', [{
      state: 'startTurn',
      activePlayer,
    }]);

    while(_.every(game.players[activePlayer].tiles, tile=> isUnplayable(game, tile)) && game.players[activePlayer].tiles.length) {
      game = game.setIn(['players', activePlayer, 'tiles'], game.tiles.slice(0, 6));
      game = game.update('tiles', tiles=> tiles.slice(6));
    }

    return game;
  }
};

