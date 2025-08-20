
import { PUBLIC_APIS, PROTECTED_APIS, STORAGE_KEYS } from '../utils/config';
import { PROTECTED_API_REQ, PUBLIC_API_REQ } from '../utils/configAxios';
import { 
  setSecureToken, 
  setUserData,
  getUserData,
  clearSecureStorage,
  isAuthenticated as checkAuth,
  setPhoneNumber
} from '../utils/secureStorage';

// Authentication API functions
export const authAPI = {
  // Send OTP to phone number
  sendOTP: async (mobile) => {
    try {
      const response = await PUBLIC_API_REQ.post(PUBLIC_APIS.login, {
        mobile
      });
      
      // Store phone number for OTP verification
      setPhoneNumber(mobile);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to send OTP');
    }
  },

  // Verify OTP and get token
  verifyOTP: async (phoneNumber, otp) => {
    try {
      const response = await PUBLIC_API_REQ.post(PUBLIC_APIS.verifyOtp, {
        mobile: phoneNumber,
        otp
      });

      console.log(response.data.data[0], "dfds");
      
      // Save token securely using HTTP-only cookie
      if (response.data.data[0].accessToken) {
        setSecureToken(response.data.data[0].accessToken);
      }
      
      // Save user data in sessionStorage (non-sensitive)
      if (response.data.user) {
        setUserData(response.data.user);
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
      // Always clear secure storage on logout
      clearSecureStorage();
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
  submitMandate: async ({ basketId, rebalancingFrequency }) => {
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
  return checkAuth();
};

// Get stored user data
export const getUserDataFromStorage = () => {
  return getUserData();
};
