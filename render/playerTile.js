
import _ from 'lodash';
import getStyle from 'utils/getStyle';

export default function PlayerTile({game, player, me, myTurn, runAction}) {
  const portfolio = player.portfolio || {};
  const state = game.state[game.state.length - 1];
  const canBuy = myTurn && player._id === game.players[state.activePlayer]._id && state.state === 'buyStock';
  return <table>
    <tbody>
      <tr>
      {_.times(7, chain=> {
        return <td key={chain} style={getStyle(chain)}>
          {portfolio[chain] || 0}
          {canBuy && !!game.chains[chain] && !soldOut(game, chain) && <button onClick={()=> buyStock(chain)}>Buy</button>}
        </td>;
      })}
      </tr>
    </tbody>
  </table>;
  function buyStock(chain) {
    runAction('buyStock', {chain});
  }
}

function soldOut(game, chain) {
  return _.sum(game.players, player=> player.portfolio[chain]) >= 25;
}
