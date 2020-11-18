// get base URL for API calls
export const apiUrl = window.location.origin.includes('localhost')
  ? 'https://uniteemployeeapp-uat.azurewebsites.net'
  : window.location.origin;
