import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

export default function createReducer(reducers = {}) {
  return combineReducers({
    routerReducer,
    ...reducers,
  });
}
