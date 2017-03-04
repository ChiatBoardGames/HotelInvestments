
export default function ComponentFactory({Tiles, PlayArea, Container}) {
  return function Component({game, playerId, state, runAction, canRunAction}) {
    const myPlayer = game.players[playerId];
    return <Container>
      <TilesTable tiles={myPlayer.tiles} placeTile={canRunAction('placeTile') && placeTile} />
      <PlayArea game={game} state={state} />
    </Container>;

    function placeTile(...tile) {
      runAction('selectTile', {tile});
    }
  };
}

