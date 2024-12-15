import axios from "axios";
const api = axios.create({
  baseURL: "https://taskmanager-gju3.onrender.com", //"http://localhost:3000" for Local environment
});

export const getTasks = () => api.get("/tasks");
export const addTask = (task) => api.post("/tasks", task);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
