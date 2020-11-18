import { createMergeReducer } from './createReducer';
import { uniqBy } from 'lodash';
import {
  FetchSharePointAuthStart,
  FetchSharePointAuthFailure,
  FetchSharePointAuthSuccess,
  FetchNewsPostsStart,
  FetchNewsPostsFailure,
  FetchNewsPostsSuccess,
  FetchNewsNoMorePosts,
  SetSharePointToken
} from '../actions/sharePointAction';

export const initialState = {
  initializing: false,
  // initialized: false,
  // idToken: null,
  accessToken: null,
  error: null,
  // loginError: null,
  // idTokenError: null,
  // accessTokenError: null,
  posts: {
    error: null,
    isLoading: false,
    hasMore: true,
    items: [],
  },
};

const sharePointReducer = createMergeReducer(initialState, {
  [FetchSharePointAuthStart]: (state) => ({
    initializing: true,
    error: null,
  }),
  [FetchSharePointAuthFailure]: (state, { payload }) => ({
    initializing: false,
    error: payload,
  }),
  [FetchSharePointAuthSuccess]: (state, { payload }) => ({
    initializing: false,
    error: null,
  }),
  [SetSharePointToken]: (state, { payload }) => ({
    accessToken: payload,
  }),


  // --- New posts
  [FetchNewsPostsStart]: (state, { payload }) => ({
    posts: {
      error: null,
      isLoading: true,
    },
  }),
  [FetchNewsPostsFailure]: (state, { payload }) => ({
    posts: {
      ...state.posts,
      error: payload,
      isLoading: false,
    },
  }),
  [FetchNewsPostsSuccess]: (state, { payload }) => ({
    posts: {
      error: null,
      isLoading: false,
      items: payload,
      hasMore: true
    },
  }),
  [FetchNewsNoMorePosts]: (state, { payload }) => ({
    posts: {
      ...state.posts,
      isLoading: false,
      hasMore: payload,
    },
  }),
});

export default sharePointReducer;