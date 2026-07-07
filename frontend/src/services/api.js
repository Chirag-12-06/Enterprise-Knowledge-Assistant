import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // change if your backend uses another port
});

export default api;