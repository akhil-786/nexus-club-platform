import DashboardLayout from "../../layouts/DashboardLayout";
import AnalyticsCard from "../../components/AnalyticsCard";
import InsightCard from "../../components/InsightCard";
import { useEffect, useState } from "react";
import { getClubEvents } from "../../services/eventService";
import EventWorkspaceCard from "../../components/EventWorkspaceCard";
import ActivityFeedCard from "../../components/ActivityFeedCard";
import AnalyticsChart from "../../components/AnalyticsChart";

const ClubAdminDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [events,setEvents] = useState([]);

  const activities = [
    {
      title:
        "Rahul Sharma registered for AI Workshop",
      time: "2 hours ago",
    },
  
    {
      title:
        "Attendance marked for Photography Walk",
      time: "5 hours ago",
    },
  
    {
      title:
        "New event created: Design Thinking Bootcamp",
      time: "Yesterday",
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const data = await getClubEvents(user.clubId);
            console.log(data);
            setEvents(data.events);
        } catch(error){
            console.error(error);
        }
    };
    fetchEvents();
  }, []);


  return (
    <DashboardLayout>

      {/* HERO SECTION */}

      <section className="dashboard-hero">

        {/* LEFT */}

        <div className="dashboard-hero-left">

          <div className="dashboard-role-badge">
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
            3 Upcoming Events
          </h2>


          <p className="hero-summary-text">

            42 students registered
            today across active events.

          </p>


          <button className="primary-btn mt-6">
            Create Event
          </button>

        </div>

      </section>


      {/* ANALYTICS */}

      <section className="analytics-grid">

        <AnalyticsCard
          label="Total Members"
          value="120"
          growth="+12% this month"
        />

        <AnalyticsCard
          label="Upcoming Events"
          value={events.length}
          growth="3 scheduled this week"
        />

        <AnalyticsCard
          label="Attendance Rate"
          value="92%"
          growth="Excellent engagement"
        />

        <AnalyticsCard
          label="Pending Requests"
          value="14"
          growth="Awaiting approval"
        />

      </section>
      <section className="analytics-chart-section">
<       AnalyticsChart />
        </section>

      {/* INSIGHTS */}

      <section className="insights-grid">

        <InsightCard
          title="Participation Trends"
          subtitle="Student engagement across events"
          stat1Label="Avg Participation"
          stat1Value="84%"
          stat2Label="Growth"
          stat2Value="+18%"
        />


        <InsightCard
          title="Attendance Analytics"
          subtitle="Attendance performance overview"
          stat1Label="Average Attendance"
          stat1Value="92%"
          stat2Label="Events Conducted"
          stat2Value="24"
        />

      </section>

            {/* Workspace SECTION */}
        <section className="workspace-section">

          <div className="workspace-header">

            <h2 className="workspace-title">
              Upcoming Events
            </h2>

          </div>


          <div className="workspace-grid">

          {events
          .sort(
            (a, b) =>
              new Date(a.eventDate) -
              new Date(b.eventDate)
          )
          .slice(0, 2)
          .map((event) => (
        
              <EventWorkspaceCard
                key={event._id}
                event={event}
              />
        
            ))}

          </div>
        
        </section>
        {/* Recent Activity SECTION */}
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