import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL =
  "https://my-json-server.typicode.com/DesiHukka/TaskManager";
const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getTasks = () => api.get("/tasks");
export const addTask = (task) => api.post("/tasks", task);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
