import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
	baseURL: API_BASE_URL,
});

export default api;
