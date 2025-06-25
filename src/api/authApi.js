import axios from 'axios';

const API_URL = 'http://localhost:5225/api/auth'; // sửa lại nếu cần

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const confirmEmail = (token) => axios.get(`${API_URL}/confirm-email?token=${token}`);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const refreshToken = (data) => axios.post(`${API_URL}/refresh-token`, data);
export const logout = (data) => axios.post(`${API_URL}/logout`, data);
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password`, data);
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data);

// TODO: Implement this endpoint on the backend
export const updateProfile = (data) => axios.put(`${API_URL}/update-profile`, data);
