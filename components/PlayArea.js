
export default function({BoxedGrid, getChainId, getStyle, displayTile}) {
  return function PlayArea({game, state}) {
    const {board} = game;
    return <BoxedGrid rows={game.rows} cols={game.cols}>
      {(row, col)=> {
        const chain = getChainId(board, state, [row, col]);
        return <BoxedGrid.Cell key={col} style={getStyle(chain)}>
          {displayTile(row, col)}
        </BoxedGrid.Cell>;
      }}
    </BoxedGrid>;
  };
}
