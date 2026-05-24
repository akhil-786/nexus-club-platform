
import api from "./api";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}`;
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

export const getCollegeAnalytics = async () => {

    const token =
      localStorage.getItem(
        "token"
    );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

    const response = await axios.get(
        `${API}/auth/analytics`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
    return response.data;
};

export const forgotPassword = async (payload) => {

    const response = await api.post( "/auth/forgot-password", payload );

    return response.data;
};

export const resetPassword = async (token, payload) => {
    const response = await api.post(`/auth/reset-password/${token}`, payload);

    return response.data;
};