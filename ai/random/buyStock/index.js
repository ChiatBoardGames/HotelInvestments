
export default function({_, Random, functions, soldOut}) {
  const {getStockInfo} = functions;
  return function(game, playerId) {
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
  };

  function canPurchaseChain(game, playerId, chain) {
    return game.chains[chain] && !soldOut(game, chain) && game.players[playerId].score >= priceOf(game, chain);
  }

  function priceOf(game, chain) {
    return getStockInfo(chain, game.chains[chain]).stockPrice;
  }

}
