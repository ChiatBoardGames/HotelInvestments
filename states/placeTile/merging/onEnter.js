
import _ from 'lodash';
import Immutable from 'immutable';
import {getStockInfo, rewardBonuses, placeTile} from 'utils/functions';

export default function onEnter(game) {
  game = Immutable(game);
  const gameLog = [];
  const state = game.state[1];
  const larger = state.selectedChain;
  const smaller = state.mergingChains.filter(chain=> chain !== larger);
  const toReplace = _.sortBy(smaller, chain=> game.chains[chain]).map(chain=> ({
    chain,
    ...getStockInfo(chain, game.chains[chain]),
  }));
  // reward bonuses
  game = toReplace.reduce((game, {chain, majorityBonus, minorityBonus})=> {
    return game.update('players', players=>  rewardBonuses(players, chain, majorityBonus, minorityBonus));
  }, game);
  const tile = state.tile;
  let updateCount = 0;
  game = game.update('board', board=> _.mapValues(board, (row, rowId)=> _.mapValues(row, (cell, colId)=> {
    if(smaller.includes(cell) || (rowId === tile[0] && colId === tile[1])) {
      updateCount++;
      return larger;
    } else {
      return cell;
    }
  })));
  game = game.updateIn(['chains', larger], tc=> tc + updateCount + 1);
  for (let smallerOne of smaller) {
    game = game.setIn(['chains', smallerOne], 0)
  }
  game = game.update('board', board => placeTile(board, state.tile, larger));
  const playerOrder = _.sortBy(_.times(game.players.length, _.identity), i=> (i + game.players.length - state.activePlayer) % game.players.length);
  const replacing = toReplace.map(({chain, stockPrice})=> ({
    chain,
    stockPrice,
    players: playerOrder.filter(i=> game.players[i].portfolio[chain]),
  })).filter(({players})=> players.length);
  if(replacing.length) {
    return game.setIn(['state', 1], {
      activePlayer: replacing[0].players[0],
      state: 'merging',
      tradeFor: larger,
      ..._.omit(replacing[0], 'players'),
      players: replacing[0].players,
      replacing: replacing.slice(1),
    });
  } else {
    return game.set('state', {
      state: 'buyStock',
      activePlayer: state.activePlayer,
    });
  }
}
