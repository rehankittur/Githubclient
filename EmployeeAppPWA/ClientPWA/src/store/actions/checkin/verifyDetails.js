import { confirmCheckin } from '../../../api';
import { ConfirmCheckinFailure, ConfirmCheckinSuccess, ConfirmCheckinStart } from '../../types';

/**
 * action when checkin confirmation  starts
 *
 */
const confirmCheckinStart = () => ({
  type: ConfirmCheckinStart,
});

/**
 * action to handle checkin confirmation failure
 *
 * @param {*} error
 */
const confirmCheckinFailure = (error) => ({
  type: ConfirmCheckinFailure,
  payload: error,
});

/**
 * action to handle checkin confirmation success
 *
 * @param {*} results
 */
const confirmCheckinSuccess = (results) => ({
  type: ConfirmCheckinSuccess,
  payload: results,
});

/**
 * api call to check-in a customer after verifying their details
 *
 * @param {string} id
 * @param {string} bookingType
 * @param {string} instanceId
 * @param {string} occupierId
 */
export const ConfirmCheckinAction = (id, bookingType, instanceId, occupierId) => (dispatch) => {
  dispatch(confirmCheckinStart());
  return confirmCheckin(id, bookingType, instanceId, occupierId)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => dispatch(confirmCheckinSuccess(data)))
    .catch((error) => dispatch(confirmCheckinFailure(error)));
};
