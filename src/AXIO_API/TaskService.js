import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

const getAllTasks = () => axios.get(API_URL);
const getTaskById = (taskId) => axios.get(`${API_URL}/${taskId}`);
const createTask = (task) => axios.post(API_URL, task);
const updateTask = (taskId, task) => axios.put(`${API_URL}/${taskId}`, task);
const deleteTask = (taskId) => axios.delete(`${API_URL}/${taskId}`);

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
