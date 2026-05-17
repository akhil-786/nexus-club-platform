import {
    useEffect,
    useState,
  } from "react";
  
  import DashboardLayout
  from "../../layouts/DashboardLayout";
  
  import {
    getClubEvents,
  } from "../../services/eventService";
  
  
  const MyEventsPage = () => {
  
    const user = JSON.parse(
      localStorage.getItem("user")
    );
  
  
    const [
      registeredEvents,
      setRegisteredEvents
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
  
      fetchMyEvents();
  
    }, []);
  
  
    const fetchMyEvents =
      async () => {
  
        try {
  
          const data =
            await getClubEvents();
  
          const myEvents =
            data.events.filter(
              (event) =>
                event.participants?.includes(
                  user._id
                )
            );
  
  
          const today =
            new Date();
  
          today.setHours(
            0, 0, 0, 0
          );
  
  
          const upcoming =
            myEvents
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
            myEvents
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
  
  
          setRegisteredEvents(
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
  
  
    return (
      <DashboardLayout>
  
        {/* HEADER */}
  
        <section>
  
          <h1 className="dashboard-page-title">
            My Events
          </h1>
  
  
          <p className="events-page-description">
  
            Track your registered
            events and completed
            club participations.
  
          </p>
  
        </section>
  
  
        {/* LOADING */}
  
        {loading ? (
  
          <p className="events-loading">
            Loading your events...
          </p>
  
        ) : (
  
          <>
  
            {/* EMPTY */}
  
            {registeredEvents.length === 0 &&
            completedEvents.length === 0 && (
  
              <div className="empty-events-state glass-card">
  
                <h2 className="empty-events-title">
                  No Registered Events
                </h2>
  
  
                <p className="empty-events-text">
  
                  Register for upcoming
                  club events to start
                  participating in your
                  community activities.
  
                </p>
  
              </div>
  
            )}
  
  
            {/* REGISTERED EVENTS */}
  
            {registeredEvents.length > 0 && (
  
              <section className="workspace-section">
  
                <div className="workspace-header">
  
                  <h2 className="workspace-title">
                    Registered Events
                  </h2>
  
                </div>
  
  
                <div className="workspace-grid">
  
                  {registeredEvents.map((event) => (
  
                    <div
                      key={event._id}
                      className="workspace-event-card glass-card"
                    >
  
                      <div className="workspace-event-top">
  
                        <div>
  
                          <span className="workspace-event-status upcoming-status">
                            registered
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
                          Registered
                        </button>
  
                      </div>
  
                    </div>
  
                  ))}
  
                </div>
  
              </section>
  
            )}
  
  
            {/* COMPLETED EVENTS */}
  
            {completedEvents.length > 0 && (
  
              <section className="workspace-section mt-20">
  
                <div className="workspace-header">
  
                  <h2 className="workspace-title">
                    Completed Participations
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
                          Participated
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
  
  export default MyEventsPage;