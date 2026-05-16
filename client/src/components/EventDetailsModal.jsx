import {useEffect, useState,} from "react";
  
import {getSingleEvent,deleteEvent} from "../services/eventService";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CreateEventModal from "./CreateEventModal";
  
  const EventDetailsModal = ({
    eventId,
    onClose,
    onEventDeleted,
  }) => {
  
    const [event, setEvent] =  useState(null);
  
    const [loading, setLoading] =  useState(true);

    const [ showDeleteModal, setShowDeleteModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
  
  
    useEffect(() => {
  
      const fetchEvent =
        async () => {
  
          try {
  
            const data =
              await getSingleEvent(
                eventId
              );
  
            setEvent(
              data.event
            );
  
          } catch (error) {
  
            console.error(error);
  
          } finally {
  
            setLoading(false);
          }
        };
  
      fetchEvent();
  
    }, [eventId]);

    const handleDelete =
    async () => {
  
      try {
  
        await deleteEvent(
          eventId
        );
  
        onEventDeleted();
  
        onClose();
  
      } catch (error) {
  
        console.error(error);
      }
  };
  
    if (loading) {
  
      return (
        <div className="modal-overlay">
  
          <div className="event-manage-modal glass-card">
  
            <p>
              Loading event...
            </p>
  
          </div>
  
        </div>
      );
    }
  
  
    return (
      <div className="modal-overlay">
  
        <div className="event-manage-modal glass-card">
  
          {/* HEADER */}
  
          <div className="event-manage-header">
  
            <div>
  
              <div className="event-status-badge">
                {event.status}
              </div>
  
  
              <h2 className="event-manage-title">
                {event.title}
              </h2>
  
  
              <p className="event-manage-meta">
  
                {event.venue}
                {" • "}
                {new Date(
                  event.eventDate
                ).toLocaleDateString()}
  
              </p>
  
            </div>
  
  
            <button
              onClick={onClose}
              className="event-close-btn"
            >
              ✕
            </button>
  
          </div>
  
  
          {/* DESCRIPTION */}
  
          <div className="event-manage-section">
  
            <h3 className="event-section-title">
              Description
            </h3>
  
            <p className="event-description-text">
              {event.description}
            </p>
  
          </div>
  
  
          {/* STATS */}
  
          <div className="event-stats-row">
  
            <div className="event-mini-stat glass-card">
  
              <p className="mini-stat-label">
                Participants
              </p>
  
              <h3 className="mini-stat-value">
                {
                  event.participants
                    ?.length || 0
                }
              </h3>
  
            </div>
  
  
            <div className="event-mini-stat glass-card">
  
              <p className="mini-stat-label">
                Attendance
              </p>
  
              <h3 className="mini-stat-value">
                {
                  event.attendance
                    ?.length || 0
                }
              </h3>
  
            </div>
  
          </div>
  
  
          {/* PARTICIPANTS */}
  
          <div className="event-manage-section">
  
            <div className="participants-header">
  
              <h3 className="event-section-title">
                Registered Students
              </h3>
  
              <span className="participants-count">
                {
                  event.participants
                    ?.length || 0
                } Students
              </span>
  
            </div>
  
  
            <div className="participants-preview">
  
              {event.participants
                ?.length === 0 ? (
  
                <p className="participants-empty">
                  No registrations yet.
                </p>
  
              ) : (
  
                event.participants
                  .slice(0, 5)
                  .map((student) => (
  
                    <div
                      key={student._id}
                      className="participant-row"
                    >
  
                      <div>
  
                        <h4 className="participant-name">
                          {student.fullName}
                        </h4>
  
                        <p className="participant-email">
                          {student.email}
                        </p>
  
                      </div>
  
  
                      <div className="participant-roll">
                        {student.rollNumber}
                      </div>
  
                    </div>
                  ))
  
              )}
  
            </div>
  
          </div>
  
  
          {/* ACTIONS */}
  
          <div className="event-actions-panel">
  
          <button className="secondary-btn" onClick={() => setShowEditModal(true)}>
            Edit Event
          </button>
  
  
            <button className="secondary-btn" onClick={()=> setShowDeleteModal(true)}>
              Delete
            </button>
  
  
            <button className="primary-btn">
              Mark Attendance
            </button>
  
          </div>
  
        </div>
        {showDeleteModal && (

        <DeleteConfirmModal
          onCancel={() =>
            setShowDeleteModal(false)
          }
          onConfirm={handleDelete}
        />
      
        )}
        
          {showEditModal && (
        
        <CreateEventModal
        
          editMode={true}
        
          existingEvent={event}
        
          onClose={() =>
            setShowEditModal(false)
          }
      
          onEventCreated={() => {
        
            onEventDeleted();
        
            setShowEditModal(false);
        
            onClose();
          }}
      
        />
      
        )}
    </div>
    );
};
  
export default EventDetailsModal;