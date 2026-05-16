import axios from "axios";

const API =
  "http://localhost:5000/api/events";


export const getClubEvents =
  async (clubId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API}/club/${clubId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const createEvent =
  async (eventData) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.post(
        `${API}/create`,
        eventData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const getSingleEvent =
  async (eventId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API}/${eventId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const deleteEvent = async (eventId) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API}/delete/${eventId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );
    return response.data;
};

export  const updateEvent = async (eventId,eventData) => {
    const token = localStorage.getItem("token");

    const  response = await axios.put(`${API}/update/${eventId}`,eventData,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );
    return response.data;
}
