import { useEffect, useState,} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getClubs, createClub, } from "../../services/clubService";
import { useNavigate } from "react-router-dom";



const ClubsPage = () => {

const navigate = useNavigate();


  const [
    clubs,
    setClubs
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    showModal,
    setShowModal
  ] = useState(false);


  const [
    formData,
    setFormData
  ] = useState({

    name: "",
    description: "",
    category: "",

  });


  useEffect(() => {

    fetchClubs();

  }, []);


  const fetchClubs = async () => {

      try {

        const data = await getClubs();

        setClubs(
          data.clubs || []
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };


  const handleChange = (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });
    };


  const handleCreateClub = async (e) => {

      e.preventDefault();

      try {

        await createClub(
          formData
        );

        setShowModal(false);

        setFormData({

          name: "",
          description: "",
          category: "",

        });

        fetchClubs();

      } catch (error) {

        console.error(error);
      }
    };


  return (
    <DashboardLayout>

      {/* HEADER */}

      <section className="workspace-header">

        <div>

          <h1 className="dashboard-page-title">
            Clubs Management
          </h1>


          <p className="events-page-description">

            Manage institutional
            clubs and expand your
            campus engagement
            ecosystem.

          </p>

        </div>


        <button
          onClick={() =>
            setShowModal(true)
          }
          className="primary-btn"
        >
          Create Club
        </button>

      </section>


      {/* CLUBS */}

      {loading ? (

        <p className="events-loading">
          Loading clubs...
        </p>

      ) : clubs.length === 0 ? (

        <div className="empty-events-state glass-card">

          <h2 className="empty-events-title">
            No Clubs Found
          </h2>


          <p className="empty-events-text">

            Create your first club
            to begin building the
            institutional ecosystem.

          </p>

        </div>

      ) : (

        <section className="workspace-grid">

          {clubs.map((club) => (

            <div
              key={club._id}
              className="workspace-event-card glass-card"
            >

              <div className="workspace-event-top">

                <div>

                  <span className="workspace-event-status upcoming-status">
                    active
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

        </section>

      )}


      {/* CREATE MODAL */}

     {showModal && (

  <div className="modal-overlay">

    <div className="club-modal glass-card">

      <div className="club-modal-header">

        <h2 className="club-modal-title">
          Create Club
        </h2>


        <button
          onClick={() =>
            setShowModal(false)
          }
          className="club-modal-close"
        >
          ✕
        </button>

      </div>


      <form
        onSubmit={
          handleCreateClub
        }
        className="club-form"
      >

        <div className="form-group">

          <label>
            Club Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter club name"
            value={formData.name}
            onChange={handleChange}
            className="dashboard-input"
            required
          />

        </div>


        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            name="description"
            placeholder="Describe the club"
            value={
              formData.description
            }
            onChange={handleChange}
            className="dashboard-input dashboard-textarea"
            required
          />

        </div>


        <div className="form-group">

          <label>
            Category
          </label>

          <input
            type="text"
            name="category"
            placeholder="Technical / Cultural / Sports"
            value={
              formData.category
            }
            onChange={handleChange}
            className="dashboard-input"
            required
          />

        </div>


        <button
          type="submit"
          className="primary-btn club-submit-btn"
        >
          Create Club
        </button>

      </form>

    </div>

  </div>

)}

    </DashboardLayout>
  );
};

export default ClubsPage;