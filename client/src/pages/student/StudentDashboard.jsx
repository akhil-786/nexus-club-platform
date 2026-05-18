import {
    useEffect,
    useState,
  } from "react";
  
  import DashboardLayout
  from "../../layouts/DashboardLayout";
  
  import AnalyticsCard
  from "../../components/AnalyticsCard";
  
  import {
    getClubEvents,
  } from "../../services/eventService";
  
  
  const StudentDashboard = () => {
  
    const user = JSON.parse(
      localStorage.getItem("user")
    );
  
  
    const [
      registeredEvents,
      setRegisteredEvents
    ] = useState([]);
  
  
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
  
      fetchDashboardData();
  
    }, []);
  
  
    const fetchDashboardData =
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
              });
  
  
          setRegisteredEvents(
            myEvents
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
  
  
    return (
      <DashboardLayout>
  
        {/* HERO */}
  
        <section className="dashboard-hero">
  
          <div>
  
            <div className="dashboard-role-badge">
              Student Dashboard
          </div>
  
  
            <h1 className="dashboard-heading">
  
              Welcome back,
              <br />
  
              {user?.fullName}
  
            </h1>
  
  
            <p className="dashboard-subheading">
  
              Explore upcoming club
              events, track your
              participation, and stay
              connected with your
              community.
  
            </p>
  
          </div>
  
        </section>
  
  
        {/* ANALYTICS */}
  
        <section className="analytics-grid">
  
          <AnalyticsCard
            label="Registered Events"
            value={
              registeredEvents.length
            }
            growth="Your total participations"
          />
  
  
          <AnalyticsCard
            label="Upcoming Events"
            value={
              upcomingEvents.length
            }
            growth="Events you joined"
          />
  
  
          <AnalyticsCard
            label="Completed Events"
            value={
              completedEvents.length
            }
            growth="Past participations"
          />
  
  
          <AnalyticsCard
            label="Achievements"
            value="0"
            growth="Coming soon"
          />
  
        </section>
  
  
        {/* UPCOMING EVENTS */}
  
        <section className="workspace-section">
  
          <div className="workspace-header">
  
            <h2 className="workspace-title">
              Your Upcoming Events
            </h2>
  
          </div>
  
  
          {loading ? (
  
            <p className="events-loading">
              Loading events...
            </p>
  
          ) : upcomingEvents.length === 0 ? (
  
            <div className="empty-events-state glass-card">
  
              <h2 className="empty-events-title">
                No Upcoming Registrations
              </h2>
  
  
              <p className="empty-events-text">
  
                Browse club events and
                start participating in
                your community
                activities.
  
              </p>
  
            </div>
  
          ) : (
  
            <div className="workspace-grid">
  
              {upcomingEvents
                .slice(0, 2)
                .map((event) => (
  
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
  
          )}
  
        </section>
  
      </DashboardLayout>
    );
  };
  
  export default StudentDashboard;