import {
    useEffect,
    useState,
  } from "react";
  
  import DashboardLayout
  from "../../layouts/DashboardLayout";
  
  import {
    getClubEvents,
    registerForEvent,
  } from "../../services/eventService";
  
  
  const StudentEventsPage = () => {
  
    const user = JSON.parse(
      localStorage.getItem("user")
    );
  
  
    const [
      upcomingEvents,
      setUpcomingEvents
    ] = useState([]);
  
  
    const [
      completedEvents,
      setCompletedEvents
    ] = useState([]);
  
  
    const [
      loading,
      setLoading
    ] = useState(true);
  
  
    useEffect(() => {
  
      fetchEvents();
  
    }, []);
  
  
    const fetchEvents =
      async () => {
  
        try {
  
          const data =
            await getClubEvents();
  
          const today =
            new Date();
  
          today.setHours(
            0, 0, 0, 0
          );
  
  
          const upcoming =
            data.events
              .filter((event) => {
  
                const eventDate =
                  new Date(
                    event.eventDate
                  );
  
                eventDate.setHours(
                  0, 0, 0, 0
                );
  
                return (
                  eventDate >= today
                );
              })
              .sort(
                (a, b) =>
                  new Date(a.eventDate)
                  - new Date(b.eventDate)
              );
  
  
          const completed =
            data.events
              .filter((event) => {
  
                const eventDate =
                  new Date(
                    event.eventDate
                  );
  
                eventDate.setHours(
                  0, 0, 0, 0
                );
  
                return (
                  eventDate < today
                );
              })
              .sort(
                (a, b) =>
                  new Date(b.eventDate)
                  - new Date(a.eventDate)
              );
  
  
          setUpcomingEvents(
            upcoming
          );
  
          setCompletedEvents(
            completed
          );
  
        } catch (error) {
  
          console.error(error);
  
        } finally {
  
          setLoading(false);
        }
      };
  
  
    const handleRegister =
      async (eventId) => {
  
        try {
  
          await registerForEvent(
            eventId
          );
  
          fetchEvents();
  
        } catch (error) {
  
          console.error(error);
        }
      };
  
  
    return (
      <DashboardLayout>
  
        {/* HEADER */}
  
        <section>
  
          <h1 className="dashboard-page-title">
            Explore Events
          </h1>
  
  
          <p className="events-page-description">
  
            Discover upcoming club
            activities and participate
            in your community events.
  
          </p>
  
        </section>
  
  
        {/* LOADING */}
  
        {loading ? (
  
          <p className="events-loading">
            Loading events...
          </p>
  
        ) : (
  
          <>
  
            {/* EMPTY STATE */}
  
            {upcomingEvents.length === 0 &&
            completedEvents.length === 0 && (
  
              <div className="empty-events-state glass-card">
  
                <h2 className="empty-events-title">
                  No Events Available
                </h2>
  
  
                <p className="empty-events-text">
  
                  Club events will appear
                  here once your club
                  starts organizing
                  activities.
  
                </p>
  
              </div>
  
            )}
  
  
            {/* UPCOMING EVENTS */}
  
            {upcomingEvents.length > 0 && (
  
              <section className="workspace-section">
  
                <div className="workspace-header">
  
                  <h2 className="workspace-title">
                    Upcoming Events
                  </h2>
  
                </div>
  
  
                <div className="workspace-grid">
  
                  {upcomingEvents.map((event) => {
  
                    const alreadyRegistered =
                      event.participants?.includes(
                        user._id
                      );
  
                    return (
  
                      <div
                        key={event._id}
                        className="workspace-event-card glass-card"
                      >
  
                        <div className="workspace-event-top">
  
                          <div>
  
                            <span className="workspace-event-status upcoming-status">
                              upcoming
                            </span>
  
  
                            <h2 className="workspace-event-title">
                              {event.title}
                            </h2>
  
                          </div>
  
                        </div>
  
  
                        <p className="workspace-event-description">
  
                          {event.description}
  
                        </p>
  
  
                        <div className="workspace-event-footer">
  
                          <div>
  
                            <p className="workspace-event-venue">
                              {event.venue}
                            </p>
  
  
                            <p className="workspace-event-date">
  
                              {new Date(
                                event.eventDate
                              ).toLocaleDateString()}
  
                            </p>
  
                          </div>
  
  
                          <button
  
                            className={
                              alreadyRegistered
                                ? "secondary-btn"
                                : "primary-btn"
                            }
  
                            disabled={
                              alreadyRegistered
                            }
  
                            onClick={() =>
                              handleRegister(
                                event._id
                              )
                            }
                          >
  
                            {alreadyRegistered
                              ? "Registered"
                              : "Register"}
  
                          </button>
  
                        </div>
  
                      </div>
  
                    );
                  })}
  
                </div>
  
              </section>
  
            )}
  
  
            {/* COMPLETED EVENTS */}
  
            {completedEvents.length > 0 && (
  
              <section className="workspace-section mt-20">
  
                <div className="workspace-header">
  
                  <h2 className="workspace-title">
                    Completed Events
                  </h2>
  
                </div>
  
  
                <div className="workspace-grid">
  
                  {completedEvents.map((event) => (
  
                    <div
                      key={event._id}
                      className="workspace-event-card glass-card opacity-80"
                    >
  
                      <div className="workspace-event-top">
  
                        <div>
  
                          <span className="workspace-event-status completed-status">
                            completed
                          </span>
  
  
                          <h2 className="workspace-event-title">
                            {event.title}
                          </h2>
  
                        </div>
  
                      </div>
  
  
                      <p className="workspace-event-description">
  
                        {event.description}
  
                      </p>
  
  
                      <div className="workspace-event-footer">
  
                        <div>
  
                          <p className="workspace-event-venue">
                            {event.venue}
                          </p>
  
  
                          <p className="workspace-event-date">
  
                            {new Date(
                              event.eventDate
                            ).toLocaleDateString()}
  
                          </p>
  
                        </div>
  
  
                        <button
                          className="secondary-btn"
                          disabled
                        >
                          Event Ended
                        </button>
  
                      </div>
  
                    </div>
  
                  ))}
  
                </div>
  
              </section>
  
            )}
  
          </>
  
        )}
  
      </DashboardLayout>
    );
  };
  
  export default StudentEventsPage;