
export default function ({isUnplayable}) {
  return function (game, playerId) {
    const myPlayer = game.players[playerId];
    let tile;
    let index = 0;
    do {
      tile = myPlayer.tiles[index++];
      if(!tile) {
        throw new Error('tried all: ' + myPlayer.tiles);
      }
    } while(isUnplayable(game, tile));
    return {
      action: 'selectTile',
      input: {
        tile,
      },
    };
  };
}
