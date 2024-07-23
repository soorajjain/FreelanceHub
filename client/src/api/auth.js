import axios from "axios";

const API_URL = "http://localhost:3002/auth/users";

export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
