export const filteredActionTypes = [
  'REDUX_STORAGE_LOAD',
  'REDUX_STORAGE_SAVE',
  'REACT_NATIVE_ROUTER_FLUX_FOCUS',
  'REACT_NATIVE_ROUTER_FLUX_PUSH',
  'REACT_NATIVE_ROUTER_FLUX_BACK_ACTION',
  'REACT_NATIVE_ROUTER_FLUX_REPLACE',
];

const logging = logger => store => next => action => {
  const isFilteredAction = filteredActionTypes.indexOf(action.type) !== -1;
  if (!isFilteredAction) {
    logger.log(`type: ${action.type}`, action);
  }

  const result = next(action);

  if (!isFilteredAction) {
    logger.log('next state', store.getState());
  }

  return result;
};

export default logging;
