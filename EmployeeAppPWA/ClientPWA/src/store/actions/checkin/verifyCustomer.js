import { fetchCheckinDetails } from '../../../api';
import {
  VerifyAndFetchDetailsFailure,
  VerifyAndFetchDetailsStart,
  VerifyAndFetchDetailsSuccess,
} from '../../types';

/**
 * start action fired on API call
 *
 */
const verifyAndFetchDetailsStart = () => ({ type: VerifyAndFetchDetailsStart });

/**
 * failure action to handle error response on making API call
 *
 */
const verifyAndFetchDetailsFailure = (error) => ({
  type: VerifyAndFetchDetailsFailure,
  payload: error,
});

/**
 * action triggered when API validates the checkin code and returns booking info
 *
 * @param {*} results
 */
const verifyAndFetchDetailsSuccess = (results) => ({
  type: VerifyAndFetchDetailsSuccess,
  payload: results,
});

/**
 * function to make the API call to validate checkin id and return customer booking info in case of success
 *
 * @param {string} uniqueIdForCheckin
 */
export const VerifyAndFetchDetailsAction = (uniqueIdForCheckin) => (dispatch) => {
  dispatch(verifyAndFetchDetailsStart());
  return fetchCheckinDetails(uniqueIdForCheckin)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => dispatch(verifyAndFetchDetailsSuccess(data)))
    .catch((error) => dispatch(verifyAndFetchDetailsFailure(error.message)));
};
