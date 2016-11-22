
export default function passFactory({mergingUtils}) {
  const {toNextPlayer} = mergingUtils;
  return function pass(game, playerId) {
    return toNextPlayer(game);
  };
}
