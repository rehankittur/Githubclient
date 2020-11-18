import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middleware = [
  thunk,
  require('./logger').default(console),
  require('./analytics').default(console)
];

// if (__DEV__) {
//   // eslint-disable-next-line no-console, global-require
//   middleware.push(require('./logger').default(console));
// }

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line no-console, global-require
//   middleware.push(require('./logger').default(console));
// }

// Thunk allows functions to be dispatched rather than objects.
// Other middleware expects plain objects so thunk must come first.
export default applyMiddleware(...middleware);