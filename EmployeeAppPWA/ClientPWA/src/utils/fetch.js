
import formatDate from './date';
export const authHeader = (token) => ({ Authorization: `Bearer ${token}` });
export const jsonHeaders = { Accept: 'application/json', 'Content-Type': 'application/json' };

export const getJsonRequest = (token, headers) => ({
  headers: { ...authHeader(token), ...jsonHeaders, ...headers },
  method: 'GET',
});

export const handleNetworkFailure = (errorResponse) => Promise.reject({
  errorResponse,
  message: 'Ensure you are connected to the internet and try again',
  status: 0,
  type: fetchFailureModes.networkFailure,
});

export const handleStatusCodes = (response) => response.json()
  .catch(() => {
    const firstDigitOfStatusCode = Math.floor(response.status / 100);
    // The API have decided to use a 418 ("I'm a teapot") status code for something which isn't
    // really an error, so we have to special case it here.
    if (firstDigitOfStatusCode < 4 || response.status === 418) {
      return {};
    }

    return Promise.reject({
      message: `Error: Status Code ${response.status}`,
      response,
      status: response.status,
      type: fetchFailureModes.unknown,
    });
  })
  .then(json => {
    if (response.ok && json.Result === 'BadUsernameOrPassword') {
      return Promise.reject({
        message: 'Incorrect username / password',
        response,
        status: 401,
        type: fetchFailureModes.authenticationError,
      });
    } if (response.ok && json.Result === 'ToManyLoginAttempts') {
      return Promise.reject({
        message: 'Too many login attempts',
        nextLoginAttempt: formatDate(json.NextLoginAttempt),
        response,
        status: 401,
        type: fetchFailureModes.accountLocked,
      });
    } if (response.ok) {
      // Response is OK so clear stringValues
      return json;
    } if (response.status === 304) {
      return null;
    } if (response.status === 418) {
      // "I'm a teapot" status code, returned by GET /profile if the profile doesn't exist yet
      return null;
    }

    // When an invalid bearer token is provided the api responds with a 401 status and the json:
    // { "Message": "Authorization has been denied for this request." }
    return Promise.reject({
      message: json.Message || json.Result || '',
      response,
      status: response.status,
      type: fetchFailureModes.statusError,
    });
  });

export const handleTimeout = (timeout) => new Promise((resolve, reject) => {
  // crashlytics.recordError(3000, 'FETCH TIMEOUT');
  return setTimeout(reject, timeout, {
    message: 'The server took too long to respond, please try again',
    status: 0,
    type: fetchFailureModes.timeout,
  })
}
);

export const fetchFailureModes = {
  accountLocked: 'accountLocked',
  authenticationError: 'authenticationError',
  networkFailure: 'networkFailure',
  serverError: 'serverError',
  statusError: 'statusError',
  timeout: 'timeout',
  unknown: 'unknown',
};

export const withTimeout = (promise, timeout = 20000) => Promise.race([promise, handleTimeout(timeout)]);

export const fetchTimeout = (resourceUrl, request = undefined, timeout) => {
  return withTimeout(
    Promise.resolve(fetch(...[resourceUrl, request]))
      .catch(err => handleNetworkFailure(err))
      .then(res => handleStatusCodes(res)),
    timeout,
  );
};