import axios from 'axios';

export const setAuthToken = token => {
  if (!token) delete axios.defaults.headers.common['Authorization'];

  axios.defaults.headers.common['Authorization'] = token;
};