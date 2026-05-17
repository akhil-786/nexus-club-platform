import { useEffect, useState,} from "react";

import { getClubEvents,} from "../../services/eventService";
import { useParams,} from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getSingleClub,removeClubAdmin,deleteClub,createClubAdmin} from "../../services/clubService";
import {  useNavigate } from "react-router-dom";

const ManageClubPage = () => {
  const navigate = useNavigate();

  const { clubId } = useParams();

  const [ club, setClub ] = useState(null);

  const [ events, setEvents ] = useState([]);

  const [ loading, setLoading ] = useState(true);

  const [
  showAdminModal,
  setShowAdminModal
] = useState(false);


const [
  adminData,
  setAdminData
] = useState({

  fullName: "",
  email: "",
  password: "",
  department: "",

});


const [
  showDeleteModal,
  setShowDeleteModal
] = useState(false);


const [
  showRemoveAdminModal,
  setShowRemoveAdminModal
] = useState(false);


const [
  selectedAdminId,
  setSelectedAdminId
] = useState(null);


  useEffect(() => {
    fetchClub();
  }, []);

  const fetchClub = async () => {
      try {
        const data =
          await getSingleClub(
            clubId
          );
        setClub(
          data.club
        );
        const eventsData =await getClubEvents(clubId);
        setEvents(
          eventsData.events || []
        );

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const handleRemoveAdmin = async (adminId) => {

    try {

      await removeClubAdmin({

        clubId,
        adminId,

      });

      fetchClub();

    } catch (error) {

      console.error(error);
    }
};

    const handleDeleteClub = async () => {


    try {

      await deleteClub(
        clubId
      );

      navigate(
        "/college-dashboard/clubs"
      );

    } catch (error) {

      console.error(error);
    }
};

const handleAdminChange =
  (e) => {

    setAdminData({

      ...adminData,

      [e.target.name]:
        e.target.value,

    });
};

const handleCreateAdmin =
  async (e) => {

    e.preventDefault();

    try {

      await createClubAdmin({

        ...adminData,

        clubId,

      });

      setShowAdminModal(false);

      fetchClub();

    } catch (error) {

      console.log(
  error.response.data
);
    }
};

  if (loading) {

    return (

      <DashboardLayout>

        <p className="events-loading">
          Loading club...
        </p>

      </DashboardLayout>
    );
  }


  if (!club) {

    return (

      <DashboardLayout>

        <div className="empty-events-state glass-card">

          <h2 className="empty-events-title">
            Club Not Found
          </h2>


          <p className="empty-events-text">

            Unable to load club
            details.

          </p>

        </div>

      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>

      {/* HERO */}

      <section className="dashboard-hero">

        <div>

          <p className="dashboard-badge">
            Club Management
          </p>


          <h1 className="dashboard-heading">

            {club.name}

          </h1>


          <p className="dashboard-subheading">

            {club.description}

          </p>

        </div>

      </section>
      <div className="workspace-header">

          <button
           onClick={() =>  setShowDeleteModal(true)}
            className="danger-btn"
          >
            Delete Club
          </button>

        </div>
        {showRemoveAdminModal && (

  <div className="modal-overlay">

    <div className="confirm-modal glass-card">

      <h2 className="confirm-title">
        Remove Club Admin
      </h2>


      <p className="confirm-text">

        Are you sure you want to
        remove this administrator?

      </p>


      <div className="confirm-actions">

        <button
          className="secondary-btn"

          onClick={() =>
            setShowRemoveAdminModal(
              false
            )
          }
        >
          Cancel
        </button>


        <button
          className="danger-btn"

          onClick={async () => {

            await handleRemoveAdmin(
              selectedAdminId
            );

            setShowRemoveAdminModal(
              false
            );
          }}
        >
          Remove
        </button>

      </div>

    </div>

  </div>

)}

{showDeleteModal && (

  <div className="modal-overlay">

    <div className="confirm-modal glass-card">

      <h2 className="confirm-title">
        Delete Club
      </h2>


      <p className="confirm-text">

        This action cannot be
        undone. All club data
        may be permanently lost.

      </p>


      <div className="confirm-actions">

        <button
          className="secondary-btn"

          onClick={() =>
            setShowDeleteModal(
              false
            )
          }
        >
          Cancel
        </button>


        <button
          className="danger-btn"

          onClick={async () => {

            await handleDeleteClub();

            setShowDeleteModal(
              false
            );
          }}
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}

      {/* ANALYTICS */}

      <section className="analytics-grid">

        <div className="analytics-card glass-card">

          <p className="analytics-label">
            Category
          </p>


          <h2 className="analytics-value">
            {club.category}
          </h2>

        </div>


        <div className="analytics-card glass-card">

          <p className="analytics-label">
            Club Admins
          </p>


          <h2 className="analytics-value">

            {club.clubAdmins?.length || 0}

          </h2>

        </div>


        <div className="analytics-card glass-card">

          <p className="analytics-label">
            Members
          </p>


          <h2 className="analytics-value">

            {club.members?.length || 0}

          </h2>

        </div>


        <div className="analytics-card glass-card">

          <p className="analytics-label">
            Status
          </p>


          <h2 className="analytics-value">
            Active
          </h2>

        </div>

      </section>


      {/* ADMINS */}

      <section className="workspace-section">

        <div className="workspace-header">

          <h2 className="workspace-title">
            Club Administrators
          </h2>

        </div>
        <button
  onClick={() =>
    setShowAdminModal(true)
  }
  className="primary-btn"
>
  Add Admin
</button>


{showAdminModal && (

  <div className="modal-overlay">

    <div className="club-modal glass-card">

      <div className="club-modal-header">

        <h2 className="club-modal-title">
          Create Club Admin
        </h2>


        <button
          onClick={() =>
            setShowAdminModal(false)
          }
          className="club-modal-close"
        >
          ✕
        </button>

      </div>


      <form
        onSubmit={
          handleCreateAdmin
        }
        className="club-form"
      >

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={
            adminData.fullName
          }
          onChange={
            handleAdminChange
          }
          className="dashboard-input"
          required
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            adminData.email
          }
          onChange={
            handleAdminChange
          }
          className="dashboard-input"
          required
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            adminData.password
          }
          onChange={
            handleAdminChange
          }
          className="dashboard-input"
          required
        />


        <input
          type="text"
          name="department"
          placeholder="Department"
          value={
            adminData.department
          }
          onChange={
            handleAdminChange
          }
          className="dashboard-input"
          required
        />


        <button
          type="submit"
          className="primary-btn club-submit-btn"
        >
          Create Admin
        </button>

      </form>

    </div>

  </div>

)}
        {club.clubAdmins?.length === 0 ? (

          <div className="empty-events-state glass-card">

            <h2 className="empty-events-title">
              No Club Admins
            </h2>


            <p className="empty-events-text">

              Assign administrators
              to manage this club.

            </p>

          </div>

        ) : (

          <div className="workspace-grid">

            {club.clubAdmins.map(
              (admin) => (

                <div
                  key={admin._id}
                  className="workspace-event-card glass-card"
                >

                  <div className="workspace-event-top">

                    <div>

                      <span className="workspace-event-status upcoming-status">
                        admin
                      </span>


                      <h2 className="workspace-event-title">

                        {admin.fullName}

                      </h2>

                    </div>

                  </div>


                  <p className="workspace-event-description">

                    {admin.email}

                  </p>


                  <div className="workspace-event-footer">

                    <div>

                      <p className="workspace-event-venue">

                        {admin.department}

                      </p>

                    </div>


                    <button  className="secondary-btn"
                      onClick={() => {
                          setSelectedAdminId(
                            admin._id
                          );
                          setShowRemoveAdminModal(
                            true
                          );
                        }}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

      <section className="workspace-section">

  <div className="workspace-header">

    <h2 className="workspace-title">
      Club Events
    </h2>

  </div>


  {events.length === 0 ? (

    <div className="empty-events-state glass-card">

      <h2 className="empty-events-title">
        No Events Found
      </h2>


      <p className="empty-events-text">

        No events have been
        created for this club.

      </p>

    </div>

  ) : (

    <div className="workspace-grid">

  {events.map((event) => {

    const isCompleted =
      new Date(event.eventDate) < new Date();

    return (

      <div
        key={event._id}
        className="workspace-event-card glass-card"
      >

        <div className="workspace-event-top">

          <div>

            <span
              className={`workspace-event-status ${
                isCompleted
                  ? "completed-status"
                  : "upcoming-status"
              }`}
            >
              {isCompleted
                ? "completed"
                : "upcoming"}
            </span>


            <h2 className="workspace-event-title">
              {event.title}
            </h2>

          </div>

        </div>


        <p className="workspace-event-description">
          {event.description}
        </p>


        <div className="workspace-event-meta">

          <p className="workspace-event-date">

            {new Date(
              event.eventDate
            ).toLocaleDateString()}

          </p>


          <p className="workspace-event-time">

            {new Date(
              event.eventDate
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}

          </p>

        </div>


        <div className="workspace-event-footer">

          <div>

            <p className="workspace-event-venue">
              {event.venue}
            </p>

          </div>

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

export default ManageClubPage;