import { apiUrl } from './baseURL';

// API to get check-in details
export const fetchCheckinDetails = async (customerId) => {
  return fetch(`${apiUrl}/api/v1/employee/customers/${customerId}`, {
    method: 'GET',
  });
};

// API for confirm check-in
export const confirmCheckin = async (id, bookingType, instanceId, occupierId) => {
  if (bookingType === 'NOMS_3RD_PARTY') {
    return fetch(
      `${apiUrl}/api/v1/employee/booking/${id}/instance/${instanceId}/occupier/${occupierId}/checkin`,
      {
        method: 'PUT',
      },
    );
  } else {
    return fetch(`${apiUrl}/api/v1/employee/booking/${id}/checkin`, {
      method: 'PUT',
    });
  }
};
