
import BoxedGrid from 'core/components/boxed-grid';
import Button from 'core/components/button';
import displayTile from 'utils/displayTile';

export default function TilesTable({tiles, placeTile}) {
  return <BoxedGrid rows={1} cols={tiles.length}>
    {(_, col)=> {
      const [a, b] = tiles[col];
      return <BoxedGrid.Cell key={`${a}:${b}`}>
        {placeTile ? <Button onClick={selectTile}>{displayTile(a, b)}</Button> : displayTile(a, b)}
      </BoxedGrid.Cell>;
      function selectTile() {
        placeTile(a, b);
      }
    }}
  </BoxedGrid>;
}

