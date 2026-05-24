import DashboardLayout from "../../layouts/DashboardLayout";

import AnalyticsCard from "../../components/AnalyticsCard";

import InsightCard from "../../components/InsightCard";

import EventWorkspaceCard from "../../components/EventWorkspaceCard";

import ActivityFeedCard from "../../components/ActivityFeedCard";

import AnalyticsChart from "../../components/AnalyticsChart";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getClubEvents,
} from "../../services/eventService";


const ClubAdminDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const navigate =
    useNavigate();


  const [
    events,
    setEvents
  ] = useState([]);


  const activities =

  events

    .sort(

      (a, b) =>

        new Date(b.createdAt) -

        new Date(a.createdAt)
    )

    .slice(0, 3)

    .map((event) => ({

      title:

        `${event.title} event created`,

      time:

        new Date(
          event.createdAt
        ).toLocaleDateString(),

    }));


  useEffect(() => {

    fetchDashboardData();

  }, []);


  const fetchDashboardData =
    async () => {

      try {

        const eventsData =
          await getClubEvents(
            user.clubId
          );

        setEvents(
          eventsData.events || []
        );

      } catch (error) {

        console.error(error);
      }
    };


  const upcomingEvents = events.filter((event) =>
        new Date(event.eventDate) > new Date()
    );


  const completedEvents =
    events.filter(

      (event) =>

        new Date(
          event.eventDate
        ) < new Date()
    );


  const totalRegistrations =
    events.reduce(

      (total, event) =>

        total +

        (
          event.participants
          ?.length || 0
        ),

      0
    );


  const totalAttendance =
    events.reduce(

      (total, event) =>

        total +

        (
          event.attendance
          ?.length || 0
        ),

      0
    );


  return (

    <DashboardLayout>

      {/* HERO */}

      <section className="dashboard-hero">

        {/* LEFT */}

        <div className="dashboard-hero-left">

          <div className="dashboard-badge">

            Club Administration

          </div>


          <h1 className="dashboard-heading">

            Welcome back,

            <span className="dashboard-highlight">

              {" "}
              {user?.fullName}

            </span>

          </h1>


          <p className="dashboard-subheading">

            Manage your club ecosystem,
            coordinate events, monitor
            attendance, and drive student
            engagement efficiently.

          </p>

        </div>


        {/* RIGHT */}

        <div className="glass-card dashboard-hero-summary">

          <p className="hero-summary-label">

            Today's Activity

          </p>


          <h2 className="hero-summary-value">

            {upcomingEvents.length}
            {" "}
            Upcoming Events

          </h2>


          <p className="hero-summary-text">

            Manage registrations,
            attendance, and student
            engagement seamlessly.

          </p>


          <button
            className="primary-btn"

            onClick={() =>

              navigate(
                "/club-dashboard/events"
              )
            }
          >
            Create Event
          </button>

        </div>

      </section>


      {/* ANALYTICS */}

      <section className="analytics-grid">

        <AnalyticsCard
          label="Total Events"

          value={events.length}

          growth="Club activities"
        />


        <AnalyticsCard
          label="Upcoming Events"

          value={
            upcomingEvents.length
          }

          growth="Scheduled events"
        />


        <AnalyticsCard
          label="Completed Events"

          value={
            completedEvents.length
          }

          growth="Successfully conducted"
        />


        <AnalyticsCard
          label="Registrations"

          value={
            totalRegistrations
          }

          growth="Student participation"
        />

      </section>


      {/* ANALYTICS CHART */}

      <section className="analytics-chart-section">

        <AnalyticsChart />

      </section>


      {/* INSIGHTS */}

      <section className="insights-grid">

        <InsightCard
          title="Participation Trends"

          subtitle="Student engagement across events"

          stat1Label="Upcoming"

          stat1Value={
            upcomingEvents.length
          }

          stat2Label="Completed"

          stat2Value={
            completedEvents.length
          }
        />


        <InsightCard
          title="Club Performance"

          subtitle="Overall event performance"

          stat1Label="Total Events"

          stat1Value={
            events.length
          }

          stat2Label="Registrations"

          stat2Value={
            totalRegistrations
          }
        />

      </section>


      {/* UPCOMING EVENTS */}

      <section className="workspace-section">

        <div className="workspace-header">

          <h2 className="workspace-title">

            Upcoming Events

          </h2>

        </div>


        {upcomingEvents.length === 0 ? (

          <div className="empty-events-state glass-card">

            <h2 className="empty-events-title">

              No Upcoming Events

            </h2>


            <p className="empty-events-text">

              Create new events to
              engage students and
              grow participation.

            </p>

          </div>

        ) : (

          <div className="workspace-grid">

            {upcomingEvents

              .sort((a, b) =>

                new Date(a.eventDate) -

                new Date(b.eventDate)
              )

              .slice(0, 2)

              .map((event) => (

                <EventWorkspaceCard
                  key={event._id}

                  event={event}

                  redirectMode={true}
                />

              ))}

          </div>

        )}

      </section>


      {/* RECENT ACTIVITY */}

      <section className="activity-section">

        <div className="workspace-header">

          <h2 className="workspace-title">

            Recent Activity

          </h2>

        </div>


        <div className="activity-grid">

          {activities.map(
            (activity, index) => (

              <ActivityFeedCard
                key={index}

                activity={activity}
              />

            )
          )}

        </div>

      </section>

    </DashboardLayout>
  );
};

export default ClubAdminDashboard;