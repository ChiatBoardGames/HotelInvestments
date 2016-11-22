
export default function MyTurnDisplayFactory({functions}) {
  const {getStyle} = functions;
  return function MyTurnDisplay({state, runAction}) {
    switch(state.state) {
      case 'declareGameOver':
        return <div>
          <button onClick={endGame}>Declare Game Over</button>
          <button onClick={continueGame}>Continue Game</button>
        </div>;
      case 'merging':
        return <div>
          <button onClick={sell}>Sell</button>
          <button onClick={trade}>Trade</button>
          <button onClick={pass}>Pass</button>
        </div>;
      case 'buyStock':
        return <button onClick={pass}>Pass</button>;
      case 'selectChain':
        return <table>
          <tbody>
            <tr>
              {state.availableChains.map(chain=> {
                return <td key={chain}>
                  <button onClick={()=> selectChain(chain)} style={{padding: 10, ...getStyle(chain)}}></button>
                </td>;
              })}
            </tr>
          </tbody>
        </table>;
      default:
        return <span></span>;
    }
    function selectChain(chain) {
      runAction('selectChain', {chain});
    }
    function endGame() {
      runAction('declareGameOver');
    }
    function continueGame() {
      runAction('continueGame');
    }
    function pass() {
      runAction('pass');
    }
    function sell() {
      runAction('sell');
    }
    function trade() {
      runAction('trade');
    }
  };
}
