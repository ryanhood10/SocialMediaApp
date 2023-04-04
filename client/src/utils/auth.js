const jwtDecode = require('jwt-decode');

export default new class AuthService {
    // Get user data from the token
    getProfile() {
        return jwtDecode(this.getToken());
    }
    // Check if the user is logged in
    loggedIn() {
        const idToken = this.getToken();
        // !!idToken allows for checking of whether it is truthy or not
        return !!idToken && !this.isTokenExpired(idToken);
    }
    // Check if the token is expired
    isTokenExpired(idToken) {
        try {
            const decoded = jwtDecode(idToken);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }
    // Get the token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }
    // Authenticate the user, save the token to localStorage, and redirect to the home page
    login(idToken) {
        console.log("This is the auth.js token")
        console.log(idToken)
        localStorage.setItem('id_token', idToken);
    }
    // Remove the token from localStorage and redirect to the login page
    logout() {
        localStorage.removeItem('id_token');
        // resets the page and removes token therefore porting them back to the login page
        window.location.reload()
    }
}

