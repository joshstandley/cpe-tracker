import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Ensure this matches your server URL
});

export default instance;
