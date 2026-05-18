import axios from "axios";

const API =`${import.meta.env.VITE_API_URL}/clubs`;


export const createClub = async (payload) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response = await axios.post(

        `${API}/create`,

        payload,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const getClubs = async () => {

    const token = localStorage.getItem(
        "token"
      );

    const response = await axios.get( API,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const getSingleClub = async (clubId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response = await axios.get(`${API}/${clubId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const removeClubAdmin =
  async (payload) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(

        `${API}/remove-admin`,

        payload,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const deleteClub =
  async (clubId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.delete(

        `${API}/delete/${clubId}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const createClubAdmin =  async (payload) => {

    const token =
      localStorage.getItem(
        "token"
      );
      
    const response = await axios.post(

        `${API}/create-admin`,

        payload,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const getAllClubAdmins = async () => {
    const token = localStorage.getItem("token"); 
    const response = await axios.get(`${API}/admins`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};