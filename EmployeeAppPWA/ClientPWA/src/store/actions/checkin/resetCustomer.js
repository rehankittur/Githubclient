import { ResetCustomerData } from '../../types';

/**
 * handle customer data reset
 *
 */
const resetCustomerData = () => ({ type: ResetCustomerData });

/**
 * triggers customer data reset including counter reset for checkin attempts
 *
 */
export const ResetCustomerDataAction = () => (dispatch) => dispatch(resetCustomerData());
