
import Container from 'core/components/container';
import Button from 'core/components/button';
import getStyle from 'utils/getStyle';

export default function MyTurnDisplay({state, runAction}) {
  switch(state.state) {
    case 'startTurn':
      return <Container>
        <Button onClick={endGame}>Declare Game Over</Button>
        <Button onClick={continueGame}>Continue Game</Button>
      </Container>;
    case 'merging':
      return <Container>
        <Button onClick={sell}>Sell</Button>
        <Button onClick={trade}>Trade</Button>
        <Button onClick={pass}>Pass</Button>
      </Container>;
    case 'buyStock':
      return <Button onClick={pass}>Pass</Button>;
    case 'selectChain':
      return <table>
        <tbody>
          <tr>
            {state.availableChains.map(chain=> {
              return <td key={chain}>
                <Button onClick={()=> selectChain(chain)} style={{padding: 10, ...getStyle(chain)}}></Button>
              </td>;
            })}
          </tr>
        </tbody>
      </table>;
    default:
      return <Container></Container>;
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
}
