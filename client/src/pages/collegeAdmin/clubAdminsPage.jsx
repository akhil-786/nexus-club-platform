import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getClubs,
  getAllClubAdmins,
} from "../../services/clubService";


const ClubAdminsPage = () => {

  const navigate =
    useNavigate();


  const [
    clubs,
    setClubs
  ] = useState([]);


  const [
    admins,
    setAdmins
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  useEffect(() => {

    fetchData();

  }, []);


  const fetchData =
    async () => {

      try {

        const clubsData =
          await getClubs();

        const adminsData =
          await getAllClubAdmins();


        setClubs(
          clubsData.clubs || []
        );

        setAdmins(
          adminsData.admins || []
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <DashboardLayout>

      <section className="dashboard-hero">
 

        <div>

          <p className="dashboard-role-badge">
            Governance Overview
          </p>


          <h1 className="dashboard-heading">

            Club
            <span className="dashboard-highlight">
              {" "}Administrators
            </span>

          </h1>


          <p className="dashboard-subheading">

            View and manage
            club-wise administrative
            access across the
            institution.

          </p>

        </div>

      </section>


      <section className="club-admins-page">

        {loading ? (

          <p className="events-loading">
            Loading admins...
          </p>

        ) : (

          <div className="club-admins-container">

            {clubs.map((club) => {

              const clubAdmins =
                admins.filter(

                  (admin) =>

                    admin.clubId
                      ?.toString()

                    ===

                    club._id
                      ?.toString()
                );

              return (

                <div
                  key={club._id}
                  className="club-admin-card glass-card"
                >

                  {/* HEADER */}

                  <div className="club-admin-top">

                    <div>

                      <h2 className="club-name">

                        {club.name}

                      </h2>


                      <p className="club-category">

                        {club.category}

                      </p>

                    </div>


                    <button
                      className="primary-btn"

                      onClick={() =>

                        navigate(

                          `/college-dashboard/clubs/${club._id}`
                        )
                      }
                    >
                      Manage
                    </button>

                  </div>


                  {/* ADMINS */}

                  <div className="club-admin-members">

                    {clubAdmins.length === 0 ? (

                      <div className="no-admins">

                        No admins assigned

                      </div>

                    ) : (

                      clubAdmins.map(
                        (admin) => (

                        <div
                          key={admin._id}
                          className="club-admin-member"
                        >

                          <div className="club-admin-avatar">

                            {
                              admin.fullName
                              ?.charAt(0)
                            }

                          </div>


                          <div>

                            <h3 className="club-admin-member-name">

                              {admin.fullName}

                            </h3>


                            <p className="club-admin-member-email">

                              {admin.email}

                            </p>

                          </div>

                        </div>

                      ))

                    )}

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>

    </DashboardLayout>
  );
};

export default ClubAdminsPage;