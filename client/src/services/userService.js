import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/auth`;


const getToken = () => {

  return localStorage.getItem(
    "token"
  );
};


export const getPendingRequests =
  async () => {

    const response =  await axios.get(`${API}/pending-users`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
    );

    return response.data;
};


export const approveUser =
  async (userId) => {

    const response =
      await axios.put(
        `${API}/approve-user/${userId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};


export const rejectUser =
  async (userId) => {

    const response =
      await axios.patch(
        `${API}/reject-user/${userId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};

export const getApprovedMembers =
  async () => {

    const response =
      await axios.get(
        `${API}/approved-users`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};