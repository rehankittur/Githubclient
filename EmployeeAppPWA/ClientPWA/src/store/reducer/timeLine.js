import { createResettableReducer } from './createReducer';

import {
  SetSlot,
} from '../actions/timeLine';

export const initialState = {
  slot: 'enter',
};

const timeLineReducer = createResettableReducer(initialState, {
  [SetSlot]: (state, { payload }) => ({
    slot: payload,
  }),
});

export default timeLineReducer;