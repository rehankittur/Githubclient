import { createMergeReducer } from './createReducer';

import {
  FetchBookingRefStart,
  FetchBookingRefFailure,
  FetchBookingRefSuccess,
  ConfirmBookingRefStart,
  ConfirmBookingRefFailure,
  ConfirmBookingRefSuccess,
  DeleteBookingRef

} from '../actions/checkinAction';

export const initialState = {
  bookingdetails: {
    error: null,
    isLoading: false,
    hasMore: false,
    items: [],
  },
   confirmUser: {
    error: null,
    isLoading: false,
    hasMore: false,
    items: [],
  },
};

const checkinReducer = createMergeReducer(initialState, {
  // --- New posts
  [FetchBookingRefStart]: (state, { payload }) => ({
    bookingdetails: {
      error: null,
      isLoading: true,
    },
  }),
  [FetchBookingRefFailure]: (state, { payload }) => ({
    bookingdetails: {
      ...state.bookingdetails,
      error: payload,
      isLoading: false,
    },
  }),
  [FetchBookingRefSuccess]: (state, { payload }) => ({    
    bookingdetails: {
      error: null,
      isLoading: false,
      items: payload,
      hasMore: true
    },
  }),

  [DeleteBookingRef]: (state, { payload }) => ({    
    bookingdetails: {
    error: null,
    isLoading: false,
    hasMore: false,
    items: [],
    },
    confirmUser: {
      error: null,
      isLoading: false,
      hasMore: false,
      items: [],
      },
  }),

 

  [ConfirmBookingRefStart]: (state, { payload }) => ({
    confirmUser: {
      error: null,
      isLoading: true,
    },
  }),
  [ConfirmBookingRefFailure]: (state, { payload }) => ({
      confirmUser: {
      ...state.confirmUser,
      error: payload,
      isLoading: false,
    },
  }),
  [ConfirmBookingRefSuccess]: (state, { payload }) => ({    
    confirmUser: {
      error: null,
      isLoading: false,
      items: payload,
      hasMore: true
    },
  }),

});

export default checkinReducer;