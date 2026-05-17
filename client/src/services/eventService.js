import axios from "axios";

// const API = "http://localhost:5000/api/events";
const API = `${import.meta.env.VITE_API_URL}/events`;


export const getClubEvents = async ( clubId ) => {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response =
      await axios.get(`${API}/club/${clubId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};
export const createEvent = async (eventData) => {

    const token =  localStorage.getItem( "token" );

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

export const getSingleEvent = async (eventId) => {

    const token = localStorage.getItem(
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


export const getDashboardAnalytics = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(`${API}/club`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const events = response.data.events;

    const today = new Date();

    const upcomingEvents = events.filter(
        (event) =>
          new Date(
            event.eventDate
          ) >= today
      );

    const completedEvents = events.filter(
        (event) =>
          new Date(
            event.eventDate
          ) < today
      );

    const totalParticipants = events.reduce(
        (total, event) => {

          return (
            total +
            (
              event.participants
                ?.length || 0
            )
          );

        },
        0
      );

    return {

      totalEvents: events.length,

      upcomingEvents: upcomingEvents.length,

      completedEvents: completedEvents.length,

      totalParticipants,
    };
};

export const registerForEvent = async (eventId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API}/register/${eventId}`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}