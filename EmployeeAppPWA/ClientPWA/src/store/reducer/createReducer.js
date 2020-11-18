export const ClearUserData = 'ClearUserData';
export const clearUserData = () =>
  ({ type: ClearUserData });

export function createResettableReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else if (action.type === ClearUserData) {
      return initialState;
    }
    return state;
  };
}

export function createMergeReducer(initialState, handlers) {
  const reducer = createResettableReducer(initialState, handlers);

  return function mergeReducer(state, action) {
    return { ...state, ...reducer(state, action) };
  };
}
