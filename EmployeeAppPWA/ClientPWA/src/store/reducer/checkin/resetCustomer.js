import { ResetCustomerData } from '../../types';

export const ResetCustomerReducers = {
  [ResetCustomerData]: () => ({
    error: null,
    isLoading: false,
    bookingDetails: null,
    failedAttempts: 0,
    isCheckedTriggered: false,
  }),
};
