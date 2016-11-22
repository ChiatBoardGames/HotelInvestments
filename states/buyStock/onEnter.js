
export default function onEnterFactory({Immutable}) {
  return function onEnter(game) {
    return Immutable(game).setIn(['state', 0, 'canBuyMore'], 3);
  };
}
