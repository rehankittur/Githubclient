export const fetcSharePointAuth = async (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      // 'Authorization': 'Bearer ' + jwt,
      // 'Accept': 'application/json;odata=verbose',
      // 'Content-Type': 'application/json;odata=verbose',
      // 'xhrFields': { withCredentials: true },
      // 'withCredentials': false,
    },
  });
};
