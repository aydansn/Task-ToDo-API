import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE);
export const getStatusList = () => axios.get(`${API_BASE}/status/getList`);

export const getTodoList = () => axios.get(`${API_BASE}/todo/getList`);

export const getTodoById = (id) =>
  axios.get(`${API_BASE}/todo/getById?id=${id}`);

export const addTodo = (data) => axios.post(`${API_BASE}/todo/add`, data);

export const updateTodo = (data) => axios.put(`${API_BASE}/todo/update`, data);

export const removeTodo = (id) =>
  axios.delete(`${API_BASE}/todo/remove?id=${id}`);
