import { createMergeReducer } from '../createReducer';

import { FetchDetailsReducers } from './verifyCustomer';
import { ConfirmDetailsReducers } from './verifyDetails';
import { ResetCustomerReducers } from './resetCustomer';

export const initialState = {
  error: null,
  isLoading: false,
  bookingDetails: null,
  failedAttempts: 0,
  isCheckedTriggered: false,
};

const checkinReducer = createMergeReducer(initialState, {
  ...FetchDetailsReducers,
  ...ConfirmDetailsReducers,
  ...ResetCustomerReducers,
});

export default checkinReducer;
