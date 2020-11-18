import { fetchTimeout, getJsonRequest } from '../utils/fetch';

export const fetchNewsArticles = (url, accessToken) => {
  const headers = {
    // 'Authorization': 'Bearer ' + accessToken,
    Accept: 'application/json;odata=verbose',
    // 'Content-Type': 'application/json;odata=verbose',
    xhrFields: { withCredentials: true },
    withCredentials: false,
  };
  return fetchTimeout(url, getJsonRequest(accessToken, headers));
};
