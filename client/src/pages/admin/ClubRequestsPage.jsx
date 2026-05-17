import {useEffect,useState,} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {getPendingRequests, approveUser, rejectUser,} from "../../services/userService";


const ClubRequestsPage = () => {

  const [
    requests,
    setRequests
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);


  useEffect(() => {

    fetchRequests();

  }, []);


  const fetchRequests =
    async () => {

      try {

        const data =
          await getPendingRequests();

        setRequests(
          data.users
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };


  const handleApprove =
    async (userId) => {

      try {

        await approveUser(
          userId
        );

        fetchRequests();

      } catch (error) {

        console.error(error);
      }
    };


  const handleReject =
    async (userId) => {

      try {

        await rejectUser(
          userId
        );

        fetchRequests();

      } catch (error) {

        console.error(error);
      }
    };


  return (
    <DashboardLayout>

      <section>

        <h1 className="dashboard-page-title">
          Membership Requests
        </h1>


        <p className="events-page-description">

          Review and manage
          student onboarding
          requests for your club.

        </p>

      </section>


      {loading ? (

        <p className="events-loading">
          Loading requests...
        </p>

      ) : requests.length === 0 ? (

        <div className="empty-events-state glass-card">

          <h2 className="empty-events-title">
            No Pending Requests
          </h2>


          <p className="empty-events-text">

            All membership requests
            have been reviewed.

          </p>

        </div>

      ) : (

        <section className="requests-grid">

          {requests.map((user) => (

            <div
              key={user._id}
              className="request-card glass-card"
            >

              <div className="request-card-top">

                <div>

                  <h2 className="request-user-name">
                    {user.fullName}
                  </h2>


                  <p className="request-user-email">
                    {user.email}
                  </p>

                </div>


                <div className="request-status">
                  pending
                </div>

              </div>


              <div className="request-meta">

                <div>

                  <p className="request-label">
                    Roll Number
                  </p>

                  <h4 className="request-value">
                    {user.rollNumber}
                  </h4>

                </div>


                <div>

                  <p className="request-label">
                    Department
                  </p>

                  <h4 className="request-value">
                    {user.department}
                  </h4>

                </div>

              </div>


              <div className="request-actions">

                <button
                  className="secondary-btn"
                  onClick={() =>
                    handleReject(
                      user._id
                    )
                  }
                >
                  Reject
                </button>


                <button
                  className="primary-btn"
                  onClick={() =>
                    handleApprove(
                      user._id
                    )
                  }
                >
                  Approve
                </button>

              </div>

            </div>

          ))}

        </section>

      )}

    </DashboardLayout>
  );
};

export default ClubRequestsPage;