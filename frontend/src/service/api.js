//importação da biblioteca axios
import axios from "axios";

//variavel api
const api = axios.create({
    baseURL: "http://localhost:3001/api"
});

export default api;