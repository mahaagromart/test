export const setupInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      // Add the auth token to every request
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors globally (e.g., token expiration, etc.)
      if (error.response && error.response.status === 401) {
        // Token expired or unauthorized
        clearAuthToken();
        // Redirect to login or show message
        window.location.href = '/login'; // Optional: redirect to login
      }
      return Promise.reject(error);
    }
  );
};

// Utility function to clear token and other related info
const clearAuthToken = () => {
  localStorage.removeItem('authToken');
  // You can also clear other related auth info if needed
};
