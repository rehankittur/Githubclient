import { combineReducers } from 'redux';

import auth, { initialState as authInitialState } from './authReducers';
import usefulInfoTab, { initialState as usefulInfoTabInitialState } from './usefulInfoTabsReducer';
import timeLine, { initialState as timeLineInitialState } from './timeLine';
import sharePoint, { initialState as sharePointInitialState } from './sharePointReducer';
import checkin, { initialState as checkinPointInitialState } from './checkin';

export const initialState = {
  auth: authInitialState,
  usefulInfoTab: usefulInfoTabInitialState,
  timeLine: timeLineInitialState,
  sharePoint: sharePointInitialState,
  checkin: checkinPointInitialState,
};

export const reducer = combineReducers({
  auth,
  usefulInfoTab,
  timeLine,
  sharePoint,
  checkin,
});
