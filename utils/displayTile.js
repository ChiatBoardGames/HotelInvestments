
export default function displayTile(row, col) {
  return (col + 1) + ', ' + String.fromCharCode('A'.charCodeAt(0) + row);
}
