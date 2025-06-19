import axios from 'axios';

const API_BASE = "http://localhost:5225/api/documents"; 

export const uploadDocument = (formData) =>
  axios.post(`${API_BASE}/upload`, formData);

export const getAllDocuments = () =>
  axios.get(`${API_BASE}`);

export const getDocumentById = (id) =>
  axios.get(`${API_BASE}/${id}`);

export const modifyDocument = (id, data) =>
  axios.put(`${API_BASE}/${id}`, data);

export const deleteDocument = (id) =>
  axios.delete(`${API_BASE}/${id}`);

export const getPagesBase64 = (id, pageNumber, batch_size) =>
  axios.get(`${API_BASE}/${id}/pages/batch/base64`, {
    params: { pageNumber, batch_size }
  });

