import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getApprovedMembers,
} from "../../services/userService";


const ClubMembersPage = () => {

  const [
    members,
    setMembers
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);


  useEffect(() => {

    fetchMembers();

  }, []);


  const fetchMembers =
    async () => {

      try {

        const data =
          await getApprovedMembers();

        setMembers(
          data.users
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };


  return (
    <DashboardLayout>

      <section>

        <h1 className="dashboard-page-title">
          Club Members
        </h1>


        <p className="events-page-description">

          View and manage approved
          members within your club
          ecosystem.

        </p>

      </section>


      {loading ? (

        <p className="events-loading">
          Loading members...
        </p>

      ) : members.length === 0 ? (

        <div className="empty-events-state glass-card">

          <h2 className="empty-events-title">
            No Members Yet
          </h2>


          <p className="empty-events-text">

            Approved members will
            appear here once users
            join your club.

          </p>

        </div>

      ) : (

        <section className="members-grid">

          {members.map((member) => (

            <div
              key={member._id}
              className="member-card glass-card"
            >

              <div className="member-avatar">

                {member.fullName
                  ?.charAt(0)}

              </div>


              <h2 className="member-name">
                {member.fullName}
              </h2>


              <p className="member-email">
                {member.email}
              </p>


              <div className="member-meta">

                <div>

                  <p className="member-label">
                    Roll Number
                  </p>

                  <h4 className="member-value">
                    {member.rollNumber}
                  </h4>

                </div>


                <div>

                  <p className="member-label">
                    Department
                  </p>

                  <h4 className="member-value">
                    {member.department}
                  </h4>

                </div>

              </div>


              <div className="member-role">

                {member.role}

              </div>

            </div>

          ))}

        </section>

      )}

    </DashboardLayout>
  );
};

export default ClubMembersPage;