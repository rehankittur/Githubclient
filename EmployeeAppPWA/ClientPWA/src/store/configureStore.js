import { createStore } from 'redux';
import middleware from './middleware/index';
import { reducer, initialState } from './reducer/index';

function configureStore() {
  const store = createStore(reducer, initialState, middleware);
  return store;
}

export default configureStore;