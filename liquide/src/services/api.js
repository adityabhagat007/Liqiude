
import { PUBLIC_APIS, PROTECTED_APIS, STORAGE_KEYS } from '../utils/config';
import { PROTECTED_API_REQ, PUBLIC_API_REQ } from '../utils/configAxios';

// Helper function to get stored token
const getStoredToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

// Helper function to save access token
const saveToken = (accessToken) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
};

// Helper function to save user data
const saveUserData = (userData) => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
};

// Helper function to clear all stored data
export const clearStoredData = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  localStorage.removeItem(STORAGE_KEYS.PHONE_NUMBER);
};


// Authentication API functions
export const authAPI = {
  // Send OTP to phone number
  sendOTP: async (mobile) => {
    try {
      const response = await PUBLIC_API_REQ.post(PUBLIC_APIS.login, {
        mobile
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to send OTP');
    }
  },

  // Verify OTP and get token
  verifyOTP: async (phoneNumber, otp) => {
    try {
      const response = await PUBLIC_API_REQ.post(PUBLIC_APIS.verifyOtp, {
        mobile:phoneNumber,
        otp
      });

      // Save token and user data
    console.log(response.data.data[0],"dfds")
      if (response.data.data[0].accessToken) {
        saveToken(response.data.data[0].accessToken);
      }
      
      if (response.data.user) {
        saveUserData(response.data.user);
      }

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to verify OTP');
    }
  },

  // Logout user
  logout: async () => {
    try {
      // If you have a logout endpoint, call it here
      // await protectedAxios.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage on logout
      clearStoredData();
    }
  }
};

// Protected API functions
export const protectedAPI = {
  getInvestments: async () => {
    try {
      const response = await PROTECTED_API_REQ.get(PROTECTED_APIS.get_investments);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch investments');
    }
  },
  getBaskets: async () => {
    try {
      const response = await PROTECTED_API_REQ.get(PROTECTED_APIS.get_baskets);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch baskets');
    }
  },
  getBasketById: async (id) => {
    try {
      const response = await PROTECTED_API_REQ.get(`${PROTECTED_APIS.get_basket_by_id}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch basket');
    }
  },
  getBasketDetails: async (id) => {
    try {
      const response = await PROTECTED_API_REQ.get(`${PROTECTED_APIS.get_basket_details}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch basket details');
    }
  },
  getBasketChart: async (basketId, period) => {
    try {
      const response = await PROTECTED_API_REQ.get(PROTECTED_APIS.basket_chart(basketId, period));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch basket chart data');
    }
  },
  subscribe: async ({ basketId, plan, units }) => {
    try {
      const response = await PROTECTED_API_REQ.post(PROTECTED_APIS.subscribe_basket(basketId), {
        period: plan,
        units: units
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to subscribe');
    }
  },
  submitMandate: async ({ basketId, automaticPayment, rebalancingFrequency }) => {
    try {
      const response = await PROTECTED_API_REQ.post(PROTECTED_APIS.submit_mandate(basketId, rebalancingFrequency), {
        rebalancingFrequency
      });
      console.log()
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to submit mandate');
    }
  },
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getStoredToken();
  return !!token;
};

// Get stored user data
export const getUserData = () => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};
