import axios from "axios";

const API_URL = "http://localhost:5225"; 

export const getCommentsByDocument = (docId) =>
  axios.get(`${API_URL}/api/Comment/document/${docId}`);

export const createComment = (data) =>
  axios.post(`${API_URL}/api/Comment`, data);

export const updateComment = (commentId, data) =>
  axios.put(`${API_URL}/api/Comment/${commentId}`, data);

export const deleteComment = (commentId) =>
  axios.delete(`${API_URL}/api/Comment/${commentId}`);

export const likeComment = (commentId) =>
  axios.post(`${API_URL}/api/Comment/${commentId}/like`);