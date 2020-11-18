import { createResettableReducer } from './createReducer';

import {
  FetchSharePriceStart,
  FetchSharePriceFailure,
  FetchSharePriceSuccess,
} from '../actions/sharePriceAction';

export const initialState = {
  price: '1,070.00p (+4.00)',
  isLoading: false,
};

const sharePriceReducer = createResettableReducer(initialState, {
  [FetchSharePriceStart]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [FetchSharePriceFailure]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [FetchSharePriceSuccess]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    price: payload.price,
  }),
});

export default sharePriceReducer;