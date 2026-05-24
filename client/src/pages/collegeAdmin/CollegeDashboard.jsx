import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import DashboardLayout
from "../../layouts/DashboardLayout";

import AnalyticsCard
from "../../components/AnalyticsCard";

import {
  getClubs,
} from "../../services/clubService";

import {
  getCollegeAnalytics,
} from "../../services/authService";


const CollegeDashboard = () => {

  const navigate =
    useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const [
    clubs,
    setClubs
  ] = useState([]);


  const [
    analytics,
    setAnalytics
  ] = useState({

    totalStudents: 0,

    totalClubAdmins: 0,

    totalActiveEvents: 0,

  });


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

        const clubsData =
          await getClubs();

        setClubs(
          clubsData.clubs || []
        );


        const analyticsData =
          await getCollegeAnalytics();

        setAnalytics(
          analyticsData.analytics || {}
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

          <div className="dashboard-badge">

            College Administration

          </div>


          <h1 className="dashboard-heading">

            Welcome back,
            <br />

            {user?.fullName}

          </h1>


          <p className="dashboard-subheading">

            Manage institutional
            clubs, oversee
            operations, and govern
            the campus engagement
            ecosystem.

          </p>

        </div>

      </section>


      {/* ANALYTICS */}

      <section className="analytics-grid">

        <AnalyticsCard
          label="Total Clubs"
          value={clubs.length}
          growth="Institution clubs"
        />


        <AnalyticsCard
          label="Club Admins"
          value={
            analytics?.totalClubAdmins || 0
          }
          growth="Management layer"
        />


        <AnalyticsCard
          label="Students"
          value={
            analytics?.totalStudents || 0
          }
          growth="Platform users"
        />


        <AnalyticsCard
          label="Events"
          value={
            analytics?.totalActiveEvents || 0
          }
          growth="Campus activities"
        />

      </section>


      {/* CLUBS PREVIEW */}

      <section className="workspace-section">

        <div className="workspace-header">

          <h2 className="workspace-title">

            Active Clubs

          </h2>

        </div>


        {loading ? (

          <p className="events-loading">

            Loading clubs...

          </p>

        ) : clubs.length === 0 ? (

          <div className="empty-events-state glass-card">

            <h2 className="empty-events-title">

              No Clubs Created

            </h2>


            <p className="empty-events-text">

              Start building your
              institutional club
              ecosystem by creating
              your first club.

            </p>

          </div>

        ) : (

          <div className="workspace-grid">

            {clubs
              .slice(0, 4)
              .map((club) => (

                <div
                  key={club._id}
                  className="workspace-event-card glass-card"
                >

                  <div className="workspace-event-top">

                    <div>

                      <span className="workspace-event-status upcoming-status">

                        Active

                      </span>


                      <h2 className="workspace-event-title">

                        {club.name}

                      </h2>

                    </div>

                  </div>


                  <p className="workspace-event-description">

                    {club.description}

                  </p>


                  <div className="workspace-event-footer">

                    <div>

                      <p className="workspace-event-venue">

                        {club.category}

                      </p>

                    </div>


                    <button
                      className="secondary-btn"

                      onClick={() =>

                        navigate(

                          `/college-dashboard/clubs/${club._id}`
                        )
                      }
                    >
                      Manage
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

export default CollegeDashboard;