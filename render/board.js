
import TilesTable from 'components/tiles';
import PlayArea from 'components/play-area';
import Container from 'core/components/container';

export default function Board({game, playerId, state, runAction, canRunAction}) {
  const myPlayer = game.players[playerId];
  console.log('here', myPlayer);
  return <Container>
    <TilesTable tiles={myPlayer.tiles} placeTile={canRunAction('placeTile') && placeTile} />
    <PlayArea game={game} state={state} />
  </Container>;

  function placeTile(...tile) {
    runAction('selectTile', {tile});
  }
}

