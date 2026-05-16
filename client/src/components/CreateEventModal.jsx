import {
    useState,
  } from "react";
  
  import {
    createEvent,
    updateEvent,
  } from "../services/eventService";
  
  
  const CreateEventModal = ({
    onClose,
    onEventCreated,
    editMode = false,
    existingEvent = null,
  }) => {
  
    const user = JSON.parse(
      localStorage.getItem("user")
    );
  
  
    const [formData, setFormData] =
      useState({
  
        title:
          existingEvent?.title || "",
  
        description:
          existingEvent?.description || "",
  
        venue:
          existingEvent?.venue || "",
  
        eventDate:
          existingEvent?.eventDate
            ?.split("T")[0] || "",
      });
  
  
    const [loading, setLoading] =
      useState(false);
  
  
    const handleChange = (e) => {
  
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };
  
  
    const handleSubmit =
      async (e) => {
  
        e.preventDefault();
  
        try {
  
          setLoading(true);
  
          const payload = {
            ...formData,
            clubId: user.clubId,
          };
  
  
          if (editMode) {
  
            await updateEvent(
              existingEvent._id,
              payload
            );
  
          } else {
  
            await createEvent(
              payload
            );
          }
  
  
          onEventCreated();
  
          onClose();
  
        } catch (error) {
  
          console.error(error);
  
        } finally {
  
          setLoading(false);
        }
      };
  
  
    return (
      <div className="modal-overlay">
  
        <div className="glass-card create-event-modal">
  
          {/* HEADER */}
  
          <div className="create-event-header">
  
            <h2 className="create-event-title">
  
              {editMode
                ? "Edit Event"
                : "Create Event"}
  
            </h2>
  
  
            <button
              onClick={onClose}
              className="create-event-close"
            >
              ✕
            </button>
  
          </div>
  
  
          {/* FORM */}
  
          <form
            onSubmit={handleSubmit}
            className="create-event-form"
          >
  
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              className="auth-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
  
  
            <textarea
              name="description"
              placeholder="Description"
              className="auth-input min-h-[120px]"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
  
  
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              className="auth-input"
              value={formData.venue}
              onChange={handleChange}
              required
            />
  
  
            <input
              type="date"
              name="eventDate"
              className="auth-input"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
  
  
            <button
              type="submit"
              className="primary-btn w-full"
            >
  
              {loading
                ? "Saving..."
                : editMode
                  ? "Save Changes"
                  : "Create Event"}
  
            </button>
  
          </form>
  
        </div>
  
      </div>
    );
  };
  
  export default CreateEventModal;