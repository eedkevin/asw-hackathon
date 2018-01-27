import { routerMiddleware } from 'react-router-redux';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(
  initialState,
  history,
) {
  // saga middleware (redux-saga)
  // router middleware (react-router)
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // if redux dev-tools extension is installed, enable it in development
  const composeEnhancers =
    // NODE_ENV === development, enable the redux dev tool
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    // we do not pass any reducer here
    // we will place reducers using injectors
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  return store;
}
