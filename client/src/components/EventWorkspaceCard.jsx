import { useState,  } from "react";
  
import EventDetailsModal from "./EventDetailsModal";
import { useNavigate } from "react-router-dom";

const EventWorkspaceCard = ({event,onManage,redirectMode = false}) => {
  
    const formattedDate = new Date(event.eventDate).toLocaleDateString("en-IN",{
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );

      const today = new Date();

      const eventDate =
        new Date(event.eventDate);
            
      const isCompleted =
        eventDate < today;
            
      const eventStatus =
        isCompleted
          ? "completed"
          : "upcoming";
        
    const navigate = useNavigate();
  
    return (
      <div className="glass-card workspace-event-card">
  
        {/* TOP */}
  
        <div className="workspace-event-top">
  
          <div>
  
            <h2 className="workspace-event-title">
              {event.title}
            </h2>
  
            <p className="workspace-event-venue">
              {event.venue}
            </p>
  
          </div>
  
  
          <div className={isCompleted ? "workspace-event-status completed-status": "workspace-event-status upcoming-status"}>
            {eventStatus}
          </div>
  
        </div>
  
  
        {/* DESCRIPTION */}
  
        <p className="workspace-event-description">
          {event.description}
        </p>
  
  
        {/* STATS */}
  
        <div className="workspace-event-stats">
  
          <div>
  
            <p className="workspace-stat-label">
              Participants
            </p>
  
            <h3 className="workspace-stat-value">
              {
                event.participants
                  ?.length || 0
              }
            </h3>
  
          </div>
  
  
          <div>
  
            <p className="workspace-stat-label">
              Attendance
            </p>
  
            <h3 className="workspace-stat-value">
              {
                event.attendance
                  ?.length || 0
              }
            </h3>
  
          </div>
  
        </div>
  
  
        {/* FOOTER */}
  
        <div className="workspace-event-footer">
  
          <div className="workspace-event-date">
            {formattedDate}
          </div>
  
  
          <button className="secondary-btn" onClick={() => {

            if (redirectMode) { navigate("/club-dashboard/events"); 
            } else {  onManage(event);
              }
            }}>
            Manage
          </button>
        </div>
     </div>
    );
  };
  
  export default EventWorkspaceCard;