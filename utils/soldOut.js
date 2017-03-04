
export default function({_}) {
  return function soldOut(game, chain) {
    return _.sum(game.players, player=> player.portfolio[chain]) >= 25;
  }
}
