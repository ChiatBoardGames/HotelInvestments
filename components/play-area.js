
import BoxedGrid from 'core/components/boxed-grid';
import getChainId from 'utils/getChainId';
import getStyle from 'utils/getStyle';
import displayTile from 'utils/displayTile';

export default function PlayArea({game, state}) {
  const {board} = game;
  return <BoxedGrid rows={game.rows} cols={game.cols}>
    {(row, col)=> {
      const chain = getChainId(game, board, state, [row, col]);
      return <BoxedGrid.Cell key={`${row}:${col}`} style={getStyle(chain)}>
        {displayTile(row, col)}
      </BoxedGrid.Cell>;
    }}
  </BoxedGrid>;
}
