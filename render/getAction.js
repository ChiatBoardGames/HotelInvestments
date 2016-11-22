
export default function() {
  return function getAction(state) {
    switch(state.state) {
      case 'placeTile':
        return 'select a tile to place';
      case 'merging':
        return 'select what to do with their obsolete stock';
      case 'buyStock':
        return 'buy stock';
      case 'declareGameOver':
        return 'decide if they want the game to end';
      case 'selectChain':
        if(state.nextState === 'createChain') {
          return 'select a chain to create';
        } else {
          return 'select a chain to win the merger';
        }
    }
  }
};
