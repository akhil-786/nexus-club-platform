
import api from "./api";
import axios from "axios";

const API = "http://localhost:5000/api";
export const registerUser = async (userData) => {
    const response = await api.post("/auth/register",userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post("/auth/login",userData);
    return response.data;
};

export const getMyProfile =  async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(`${API}/auth/me`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};


export const updateProfile = async (payload) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API}/auth/update-profile`, payload,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

