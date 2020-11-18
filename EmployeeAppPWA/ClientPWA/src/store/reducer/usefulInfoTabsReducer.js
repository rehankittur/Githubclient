import { createResettableReducer } from './createReducer';

import {
  SetUsefulInfoTabsIndex,
} from '../actions/usefulInfoTabsAction';

// TODO: I imagine one day that the tabs content will need to be dynamically pulled from an endpoint hence which the overkill of redux is here.
export const initialState = {
  index: 0,
};

const UsefulInfoTabsReducer = createResettableReducer(initialState, {
  [SetUsefulInfoTabsIndex]: (state, { payload }) => ({
    ...state,
    index: payload,
  }),
});

export default UsefulInfoTabsReducer;