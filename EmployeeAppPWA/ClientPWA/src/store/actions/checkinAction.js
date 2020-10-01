import { fetchCheckinDetails, confirmCheckin } from "../../api";

//-------------  API Auth -------------//

export const FetchBookingRefStart = "FetchBookingRefStart";
export const onFetchBookingRefStart = () => ({ type: FetchBookingRefStart });

export const FetchBookingRefFailure = "FetchBookingRefFailure";
export const onFetchBookingRefFailure = () => ({
  type: FetchBookingRefFailure,
});

export const FetchBookingRefSuccess = "FetchBookingRefSuccess";
export const onFetchBookingRefSuccess = (results) => ({
  type: FetchBookingRefSuccess,
  payload: results,
});

export const ConfirmBookingRefStart = "ConfirmBookingRefStart";
export const onConfirmBookingRefStart = () => ({
  type: ConfirmBookingRefStart,
});

export const ConfirmBookingRefFailure = "ConfirmBookingRefFailure";
export const onConfirmBookingRefFailure = (results) => ({
  type: ConfirmBookingRefFailure,
  payload: results,
});

export const ConfirmBookingRefSuccess = "ConfirmBookingRefSuccess";
export const onConfirmBookingRefSuccess = (results) => ({
  type: ConfirmBookingRefSuccess,
  payload: results,
});

export const DeleteBookingRef = "DeleteBookingRef";
export const onDeleteBookingRef = () => ({ type: DeleteBookingRef });

export const deleteBookingRefAction = () => (dispatch, getState) => {
  const { checkin } = getState();
  dispatch(onDeleteBookingRef());
};

export const fetchBookingRefAction = (bookingid) => (dispatch, getState) => {
  const { checkin } = getState();
  dispatch(onFetchBookingRefStart());
  return fetchCheckinDetails(bookingid)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      dispatch(onFetchBookingRefSuccess(data));
    })
    .catch(function (error) {
      dispatch(onFetchBookingRefFailure(error));
    });
};

export const confirmBookingRefAction = (
  id,
  bookingType,
  instanceId,
  occupierId
) => (dispatch, getState) => {
  dispatch(onConfirmBookingRefStart());
  return confirmCheckin(id, bookingType, instanceId, occupierId)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      dispatch(onConfirmBookingRefSuccess(data));
    })
    .catch(function (error) {
      dispatch(onConfirmBookingRefFailure(error));
    });
};
