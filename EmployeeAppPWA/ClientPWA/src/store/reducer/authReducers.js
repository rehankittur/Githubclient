import { createMergeReducer } from './createReducer';

export const initialState = {
  initializing: false,
  initialized: false,
  idToken: null,
  accessToken: null,
  error: null,
  loginError: null,
  idTokenError: null,
  accessTokenError: null,
  // state: AuthenticationState.Unauthenticated,
};

// https://github.com/syncweek-react-aad/react-aad#integrating-with-a-redux-store
const authReducer = createMergeReducer(initialState, {
  AAD_LOGIN_SUCCESS: (state, { payload }) => ({
    ...state, 
    aadResponse: payload,
  }),
  AAD_LOGIN_FAILED: (state, { payload }) => ({
    ...state, 
    aadResponse: null,
    loginError: payload,
  }),
  AAD_LOGIN_ERROR: (state, { payload }) => ({
    ...state, 
    aadResponse: null,
    loginError: payload,
  }),


  AAD_LOGOUT_SUCCESS: (state) => ({
    ...state, 
    aadResponse: null,
  }),


  AAD_INITIALIZING: (state) => ({
    ...state, 
    initializing: true,
    initialized: false,
  }),
  AAD_INITIALIZED: (state) => ({
    ...state, 
    initializing: false,
    initialized: true,
  }),


  AAD_ACQUIRED_ID_TOKEN_SUCCESS: (state, { payload }) => ({
    ...state, 
    idToken: payload,
    idTokenError: null,
  }),
  AAD_ACQUIRED_ID_TOKEN_ERROR: (state, { payload }) => ({
    ...state, 
    idToken: null,
    idTokenError: payload,
  }),


  AAD_ACQUIRED_ACCESS_TOKEN_SUCCESS: (state, { payload }) => ({
    ...state, 
    accessToken: payload,
    accessTokenError: null,
  }),
  AAD_ACQUIRED_ACCESS_TOKEN_ERROR: (state, { payload }) => ({
    ...state, 
    accessToken: null,
    accessTokenError: payload,
  }),
        // [AuthenticationActions.Initializing]: (state) => ({
        //     ...state,
        //     initializing: true,
        //     initialized: false,
        // }),
        // [AuthenticationActions.Initialized]: (state) => ({
        //   ...state,
        //   initializing: false,
        //   initialized: true,
        // }),
  // [AuthenticationActions.AcquiredIdTokenSuccess]: (state, { payload }) => ({
  //   ...state,
  //   idToken: payload,
  // }),
  // [AuthenticationActions.AcquiredAccessTokenSuccess]: (state, { payload }) => ({
  //   ...state,
  //   accessToken: payload,
  // }),
  // [AuthenticationActions.AcquiredAccessTokenError]: (state) => ({
  //   ...state,
  //   accessToken: null,
  // }),
  // [AuthenticationActions.LoginSuccess]: (state, { payload }) => ({
  //   ...state,
  //   account: payload.account,
  // }),
  // [AuthenticationActions.LoginError]: (state) => ({
  //   ...state, 
  //   idToken: null, 
  //   accessToken: null, 
  //   account: null 
  // }),
  // [AuthenticationActions.AcquiredIdTokenError]: (state) => ({
  //   ...state,
  //   idToken: null,
  //   accessToken: null,
  //   account: null 
  // }),
  // [AuthenticationActions.LogoutSuccess]: (state) => ({
  //   ...state,
  //   idToken: null,
  //   accessToken: null,
  //   account: null 
  // }),
  // [AuthenticationActions.AuthenticatedStateChanged]: (state, { payload }) => ({
  //   ...state,
  //   state: payload,
  // }),
});

export default authReducer;