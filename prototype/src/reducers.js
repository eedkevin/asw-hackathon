import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as landingPageReducers from './Landing/reducers';
import * as productListPageReducers from './ProductList/reducers';

export default function createReducer(reducers = {}) {
  return combineReducers({
    routerReducer,
    ...landingPageReducers,
    ...productListPageReducers,
    ...reducers,
  });
}
