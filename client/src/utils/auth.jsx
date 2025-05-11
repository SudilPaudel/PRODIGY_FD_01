export const authenticateUser = (token) => {
    localStorage.setItem('auth-token', token);
  };
  
  export const isAuthenticated = () => {
    const token = localStorage.getItem('auth-token');
    return token ? true : false;
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('auth-token');
  };
  