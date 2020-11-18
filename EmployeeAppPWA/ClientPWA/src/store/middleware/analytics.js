import { analyticsService } from 'Unite/Services/analyticsService';

const analytics = analytics => store => next => action => {
  switch (action.type) {
    case 'AAD_LOGIN_SUCCESS':
      analyticsService.sendEvent("Account", "Login", "Success");
      break;
    case 'AAD_LOGOUT_SUCCESS':
      analyticsService.sendEvent("Account", "Logout");
      break;
    case 'AAD_ACQUIRED_ID_TOKEN_ERROR':
    case 'AAD_ACQUIRED_ACCESS_TOKEN_ERROR':
    case 'AAD_LOGIN_FAILED':
    case 'AAD_LOGIN_ERROR':
      analyticsService.sendEvent("Account", "Login", "Failure");
      break;
    default:
      // do nothing
  }

  const result = next(action);

  const aadResponse = store.getState().auth.aadResponse;
  const userId = aadResponse && aadResponse.account.accountIdentifier;
  analyticsService.setUserId(userId);

  return result;
};

export default analytics;