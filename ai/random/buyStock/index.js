
import soldOut from 'utils/soldOut';
import Random from 'core/utils/random';
import {getStockInfo} from 'utils/functions';
import _ from 'lodash';

export default function buyStock(game, playerId) {
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

function canPurchaseChain(game, playerId, chain) {
  return game.chains[chain] && !soldOut(game, chain) && game.players[playerId].score >= priceOf(game, chain);
}

function priceOf(game, chain) {
  return getStockInfo(chain, game.chains[chain]).stockPrice;
}
