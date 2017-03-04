

export default function({_}) {
  return {
    getStockInfo,
    rewardBonuses,
    findNeighbors,
    placeTile,
    placeTiles,
    nextActivePlayer,
    nextActivePlayerForMerging,
  };

  function getStockInfo(id, tileCount) {
    const baseIndex = tileCount <= 5 ? tileCount - 1 : (tileCount <= 10 ? 5 : 5 + Math.min(4, Math.floor((tileCount - 1) / 10)));
    const index = baseIndex + (id < 2 ? 0 : (id < 5 ? 1 : 2));
    return {
      stockPrice: 100 + (100 * index),
      majorityBonus: 1000 + (1000 * index),
      minorityBonus: 500 + (500 * index),
    };
  }

  function rewardBonuses(players, chain, majorityBonus, minorityBonus) {
    const sorted = _(players).map((player, playerId)=> ({
      playerId,
      num: -_.get(player, ['portfolio', chain]),
    })).filter('num').sortBy('num').value();
    const majorityOwners = _(sorted).takeWhile((player, i, [firstPlayer])=> {
      return player.num === firstPlayer.num;
    }).map('playerId').value();
    if(majorityOwners.length) {
      if(majorityOwners.length > 1) {
        const totalBonus = majorityBonus + minorityBonus;
        return majorityOwners.reduce((players, playerId)=> {
          return players.updateIn([playerId, 'score'], score=> score + Math.ceil(totalBonus / majorityOwners.length));
        }, players);
      } else {
        players = players.updateIn([majorityOwners[0], 'score'], score=> score + majorityBonus);
        const minorityOwners = _(sorted).slice(majorityOwners.length).takeWhile((player, i, [firstPlayer])=> {
          return player.num === firstPlayer.num;
        }).map('playerId').value();
        return (minorityOwners.length ? minorityOwners : majorityOwners).reduce((players, playerId, i, coll)=> {
          return players.updateIn([playerId, 'score'], score=> score + Math.ceil(minorityBonus / coll.length));
        }, players);
      }
    }
    return players;
  }

  function findNeighbors(board, tile) {
    const neighbors = new Map();
    _.times(4, i=> {
      const xkey = tile[0] + (i < 2 ? 0 : (i === 3 ? 1: -1));
      const ykey = tile[1] + (i >= 2 ? 0 : (i === 0 ? 1: -1));
      const value = _.get(board, `${xkey}.${ykey}`);
      if(value === -1) {
        let siblings = neighbors.get(value);
        if(!siblings) {
          neighbors.set(value, siblings = []);
        }
        siblings.push([xkey, ykey]);
      } else if(value != null && value >= 0) {
        neighbors.set(value, true);
      }
    });
    return _.partition(Array.from(neighbors.entries()), ([mergeWith])=> mergeWith !== -1);
  }

  function placeTile(board, tile, value) {
    return board.setIn(tile, value);
  }

  function placeTiles(board, tiles, value) {
    return tiles.reduce((board, tile)=> {
      return placeTile(board, tile, value);
    }, board);
  }

  function nextActivePlayer(state, game) {
    return state.update('activePlayer', ap=> (ap + 1) % game.players.length);
  }

  function nextActivePlayerForMerging(state, game) {
    state = nextActivePlayer(state);
    if(state.activePlayer === game.state[0].activePlayer) {
      state = state.update('toReplace', tr=> tr.slice(1));
    }
    return state;
  }
  function getNextPlayerForMerging(state, game, atLeastOnce) {
    //while(atLeastOnce || (state.toReplace.length && !game.players[state.activePlayer].portfolio[state.toReplace[0])) {
    //  atLeastOnce = false;
    //  state = nextActivePlayerForMerging(state, game);
    //}
    //return state;
  }
}
