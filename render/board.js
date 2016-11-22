
export default function ComponentFactory({_, getChainId, functions}) {
  const {getStyle} = functions;
  return function Component({game, playerId, state, runAction}) {
    const myPlayer = game.players[playerId];
    return <div>
      <TilesTable tiles={myPlayer.tiles} placeTile={state.state === 'placeTile' && state.activePlayer === playerId && placeTile} />
      <Board board={game.board} state={state} />
    </div>;

    function placeTile(...tile) {
      runAction('selectTile', {tile});
    }
  };
  function Board({board, state}) {
    return <table>
      <tbody>
      {_.times(9, row=> {
        return <tr key={row}>
          {_.times(12, col=> {
            const chain = getChainId(board, state, [row, col]);
            return <td key={col} style={getStyle(chain)}>
              {displayTile(row, col)}
            </td>;
          })}
        </tr>;
      })}
      </tbody>
    </table>;
  }
  function TilesTable({tiles, placeTile}) {
    return <table>
      <tbody>
        <tr>
          {tiles.map(([a, b])=> {
            return <td key={`${a}:${b}`}>
              {placeTile ? <button onClick={()=> placeTile(a, b)}>{displayTile(a, b)}</button> : displayTile(a, b)}
            </td>;
          })}
        </tr>
      </tbody>
    </table>;
  }

  function displayTile(row, col) {
    return (col + 1) + ', ' + String.fromCharCode('A'.charCodeAt(0) + row);
  }
}

