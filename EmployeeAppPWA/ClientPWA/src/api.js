import { fetchTimeout, getJsonRequest } from "./utils/fetch";

// get base URL for API calls
const apiUrl = window.location.origin.includes("localhost")
  ? "https://uniteemployeeapp-uat.azurewebsites.net"
  : window.location.origin;

// export const fetchSharePrice = (token) =>
//   fetchTimeout('http://qfx.quartalflife.com/Clients/uk/unite_group2/XML/xml.aspx', postJsonRequest(token));

//CurrentPrice

// export const fetchNewsArticles = async (url, accessToken) => {
//   return fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer ' + accessToken,
//       'Accept': 'application/json;odata=verbose',
//       'Content-Type': 'application/json;odata=verbose',
//       'xhrFields': { withCredentials: true },
//       'withCredentials': false,
//     },
//   });
// };

export const fetchNewsArticles = (url, accessToken) => {
  const headers = {
    // 'Authorization': 'Bearer ' + accessToken,
    Accept: "application/json;odata=verbose",
    // 'Content-Type': 'application/json;odata=verbose',
    xhrFields: { withCredentials: true },
    withCredentials: false,
  };
  return fetchTimeout(url, getJsonRequest(accessToken, headers));
};

export const fetcSharePointAuth = async (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      // 'Authorization': 'Bearer ' + jwt,
      // 'Accept': 'application/json;odata=verbose',
      // 'Content-Type': 'application/json;odata=verbose',
      // 'xhrFields': { withCredentials: true },
      // 'withCredentials': false,
    },
  });
};

//API to get check-in details
export const fetchCheckinDetails = async (customerId) => {
  return fetch(`${apiUrl}/api/v1/employee/customers/${customerId}`, {
    method: "GET",
  });
};

//API for confirm check-in
export const confirmCheckin = async (
  id,
  bookingType,
  instanceId,
  occupierId
) => {
  if (bookingType === "NOMS_3RD_PARTY") {
    return fetch(
      `${apiUrl}/api/v1/employee/booking/${id}/instance/${instanceId}/occupier/${occupierId}/checkin`,
      {
        method: "PUT",
      }
    );
  } else {
    return fetch(`${apiUrl}/api/v1/employee/booking/${id}/checkin`, {
      method: "PUT",
    });
  }
};
