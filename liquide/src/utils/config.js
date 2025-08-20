// API Configuration
export const BASE_URL = `http://10.10.13.33:1337`;

export const PUBLIC_APIS = {
  login: BASE_URL + "/send-otp",
  verifyOtp: BASE_URL + "/verify-otp"
};

export const PROTECTED_APIS = {
  get_baskets: BASE_URL + "/baskets",
  get_basket_by_id: BASE_URL + "/baskets",
  get_investments : BASE_URL + "/investments",
  get_basket_details : BASE_URL + "/basket"
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'authToken',
  USER_DATA: 'liquide_user_data',
  PHONE_NUMBER: 'liquide_phone_number',
};

// App Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  BASKETS: '/baskets',
  HOME: '/',
};