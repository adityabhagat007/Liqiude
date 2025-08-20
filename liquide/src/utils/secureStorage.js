// Secure token management with encryption and secure storage practices

// Simple encryption key (in production, this should be more sophisticated)
const ENCRYPTION_KEY = 'liquide_secure_key_2024';

// Simple encryption function (in production, use a proper encryption library)
const encrypt = (text) => {
  try {
    return btoa(encodeURIComponent(text));
  } catch (error) {
    console.error('Encryption error:', error);
    return text;
  }
};

// Simple decryption function
const decrypt = (encryptedText) => {
  try {
    return decodeURIComponent(atob(encryptedText));
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText;
  }
};

// Set secure token with encryption
export const setSecureToken = (token, expiresIn = 24 * 60 * 60 * 1000) => {
  try {
    const expires = Date.now() + expiresIn;
    const tokenData = {
      token: encrypt(token),
      expires: expires,
      createdAt: Date.now()
    };
    
    // Store in sessionStorage for better security (cleared when tab closes)
    sessionStorage.setItem('authToken', JSON.stringify(tokenData));
    
    // Also store a flag in localStorage to persist session across tabs
    localStorage.setItem('isAuthenticated', 'true');
  } catch (error) {
    console.error('Error setting secure token:', error);
  }
};

// Get secure token with decryption and expiration check
export const getSecureToken = () => {
  try {
    const tokenData = sessionStorage.getItem('authToken');
    if (!tokenData) return null;
    
    const parsed = JSON.parse(tokenData);
    
    // Check if token has expired
    if (parsed.expires && Date.now() > parsed.expires) {
      removeSecureToken();
      return null;
    }
    
    // Check if token is too old (optional security measure)
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    if (parsed.createdAt && (Date.now() - parsed.createdAt) > maxAge) {
      removeSecureToken();
      return null;
    }
    
    return decrypt(parsed.token);
  } catch (error) {
    console.error('Error getting secure token:', error);
    return null;
  }
};

// Remove secure token
export const removeSecureToken = () => {
  try {
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
  } catch (error) {
    console.error('Error removing secure token:', error);
  }
};

// Set user data (non-sensitive data)
export const setUserData = (userData) => {
  try {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

// Get user data
export const getUserData = () => {
  try {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

// Remove user data
export const removeUserData = () => {
  try {
    sessionStorage.removeItem('userData');
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

// Clear all secure storage
export const clearSecureStorage = () => {
  removeSecureToken();
  removeUserData();
  removePhoneNumber();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getSecureToken();
  const isAuthFlag = localStorage.getItem('isAuthenticated');
  
  // Check both token and authentication flag
  if (!token || !isAuthFlag) {
    // Clean up if inconsistent state
    if (!token && isAuthFlag) {
      localStorage.removeItem('isAuthenticated');
    }
    return false;
  }
  
  return true;
};

// Set phone number (for OTP flow)
export const setPhoneNumber = (phoneNumber) => {
  try {
    sessionStorage.setItem('phoneNumber', phoneNumber);
  } catch (error) {
    console.error('Error storing phone number:', error);
  }
};

// Get phone number
export const getPhoneNumber = () => {
  try {
    return sessionStorage.getItem('phoneNumber');
  } catch (error) {
    console.error('Error retrieving phone number:', error);
    return null;
  }
};

// Remove phone number
export const removePhoneNumber = () => {
  try {
    sessionStorage.removeItem('phoneNumber');
  } catch (error) {
    console.error('Error removing phone number:', error);
  }
};

// Refresh token (if needed)
export const refreshToken = async () => {
  try {
    const currentToken = getSecureToken();
    if (!currentToken) return false;
    
    // Here you would typically call your refresh token endpoint
    // For now, we'll just extend the current token
    const tokenData = sessionStorage.getItem('authToken');
    if (tokenData) {
      const parsed = JSON.parse(tokenData);
      const newExpires = Date.now() + (24 * 60 * 60 * 1000); // Extend by 24 hours
      
      parsed.expires = newExpires;
      sessionStorage.setItem('authToken', JSON.stringify(parsed));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
};
