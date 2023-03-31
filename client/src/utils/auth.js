const jwtDecode = require('jwt-decode');
const axios = require('axios');


const API_BASE_URL = 'https://your-api-url.com';

class AuthService {
  // Get user data from the token
  getProfile() {
    return jwtDecode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Get the token from localStorage
  getToken() {
    return localStorage.getItem('access_token');
  }

  // Set the default authorization header for axios
  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  // Authenticate the user, save the token to localStorage, and redirect to the home page
  async login(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('access_token', token);
      this.setAuthToken(token);
      window.location.assign('/');
    } catch (error) {
      console.error('Error during authentication:', error);
      // Handle the error, e.g., show an error message to the user
    }
  }

  // Remove the token from localStorage and redirect to the login page
  logout() {
    localStorage.removeItem('access_token');
    this.setAuthToken(false);
    window.location.assign('/login');
  }
}

export default new AuthService();
