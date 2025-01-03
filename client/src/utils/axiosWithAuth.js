import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:3000", // Ensure this matches your server's URL
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axiosWithAuth;
