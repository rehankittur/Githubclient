import { ConfirmCheckinFailure, ConfirmCheckinSuccess, ConfirmCheckinStart } from '../../types';

export const ConfirmDetailsReducers = {
  [ConfirmCheckinStart]: () => ({
    error: null,
    isLoading: true,
  }),
  [ConfirmCheckinFailure]: (state, { payload }) => ({
    error: payload,
    isLoading: false,
    bookingDetails: null,
    failedAttempts: 0,
    isCheckedTriggered: true,
  }),
  [ConfirmCheckinSuccess]: () => ({
    error: null,
    isLoading: false,
    bookingDetails: null,
    failedAttempts: 0,
    isCheckedTriggered: true,
  }),
};
