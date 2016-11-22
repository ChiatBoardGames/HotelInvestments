
export default function RandomAIFactory({Random, functions, _, isUnplayable}) {
  const {findNeighbors, getStockInfo} = functions;
  return function RandomAI(game, playerId) {
    const myPlayer = game.players[playerId];
    const state = game.state[game.state.length - 1];
    switch(state.state) {
      case 'startTurn':
        return {
          action: 'declareGameOver',
        };
      case 'placeTile':
        let tile;
        let index = 0;
        do {
          tile = myPlayer.tiles[index++];
          if(!tile) {
            console.log('tried all', myPlayer.tiles, game.tiles);
          }
        } while(isUnplayable(game, tile));
        return {
          action: 'selectTile',
          input: {
            tile,
          },
        };
      case 'merging':
        const options = ['sell', 'trade'];
        return {
          action: myPlayer.portfolio[state.chain] >= 2 && !soldOut(game, state.tradeFor) ? Random.randomEntry(options) : 'sell',
        };
      case 'selectChain':
        return {
          action: 'selectChain',
          input: {chain: Random.randomEntry(state.availableChains)},
        };
      case 'buyStock':
        let chain;
        let attempts = 3;
        do {
          chain = Random.randomEntry(_.keys(game.chains));
          attempts--;
          if(canPurchaseChain(game, playerId, chain)) {
            break;
          }
          chain = null;
        } while(attempts);
        return {
          action: chain != null ? 'buyStock' : 'pass',
          input: {chain},
        };
    }
  };
  function canPurchaseChain(game, playerId, chain) {
    return game.chains[chain] && !soldOut(game, chain) && game.players[playerId].score >= priceOf(game, chain);
  }
  function priceOf(game, chain) {
    const {stockPrice} = getStockInfo(chain, game.chains[chain]);
    return stockPrice;
  }
  function soldOut(game, chain) {
    return _.sum(game.players, player=> player.portfolio[state.tradeFor]) >= 25;
  }
}
