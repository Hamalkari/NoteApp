import axios from 'axios';
import Nprogress from 'nprogress';
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/note'
});

apiClient.interceptors.request.use(config => {
  Nprogress.start();
  return config;
});

apiClient.interceptors.response.use(response => {
  Nprogress.done();
  return response;
});

const getNotes = () => {
  return apiClient.get(`/list`);
};

const createNote = payload => {
  return apiClient.post(`/create`, payload);
};

const deleteNote = id => {
  return apiClient.delete(`/delete/${id}`);
};

const updateNote = payload => {
  return apiClient.put(`/update/${payload._id}`, payload);
};
export default {
  getNotes,
  createNote,
  deleteNote,
  updateNote
};
