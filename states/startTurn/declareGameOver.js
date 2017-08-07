
import Immutable from 'immutable';
import {getStockInfo, rewardBonuses} from 'utils/functions';
import _ from 'lodash';

export default function declareGameOver(game) {
  game.state = [{state: 'endGame'}];
  return game;
}
