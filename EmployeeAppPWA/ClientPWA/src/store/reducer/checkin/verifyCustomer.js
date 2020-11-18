import {
  VerifyAndFetchDetailsFailure,
  VerifyAndFetchDetailsStart,
  VerifyAndFetchDetailsSuccess,
} from '../../types';

export const FetchDetailsReducers = {
  [VerifyAndFetchDetailsStart]: () => ({
    isLoading: true,
    error: null,
    bookingDetails: null,
  }),
  [VerifyAndFetchDetailsFailure]: (state, { payload }) => ({
    error: payload,
    failedAttempts: state.failedAttempts + 1,
    isLoading: false,
    bookingDetails: null,
  }),
  [VerifyAndFetchDetailsSuccess]: (state, { payload }) => ({
    error: null,
    isLoading: false,
    bookingDetails: payload,
    failedAttempts: 0,
  }),
};
