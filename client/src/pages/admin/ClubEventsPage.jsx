import {useEffect,useState,} from "react";
  
  import DashboardLayout from "../../layouts/DashboardLayout";
  
  import {getClubEvents,} from "../../services/eventService";
  
  import EventWorkspaceCard from "../../components/EventWorkspaceCard";
  import EventDetailsModal from "../../components/EventDetailsModal";
  import CreateEventModal from "../../components/CreateEventModal";
  
  const ClubEventsPage = () => {
  
    const user = JSON.parse(
      localStorage.getItem("user")
    );
  
    const [events, setEvents] =  useState([]);
  
    const [loading, setLoading] =  useState(true);
    
    const [showModal, setShowModal] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);
  
  
      const fetchEvents = async () => {
    
        try {
    
          const data =
            await getClubEvents(
              user.clubId
            );
    
          setEvents(
            data.events
          );
    
        } catch (error) {
    
          console.error(error);
    
        } finally {
    
          setLoading(false);
        }
      };
    
    
    useEffect(() => {
    
      fetchEvents();
    
    }, []);
  
    return (
      <DashboardLayout>
  
        {/* HEADER */}
  
        <section className="events-page-header">
  
          <div>
  
            <h1 className="dashboard-page-title">
              Events Management
            </h1>
  
            <p className="events-page-description">
  
              Create, manage, and monitor
              all club events and student
              participation activities.
  
            </p>
  
          </div>
  
  
          <button className="primary-btn" onClick={() =>setShowModal(true)}>
            Create Event
          </button>
  
        </section>
  
  
        {/* EVENTS */}
  
        {loading ? (
  
          <p className="events-loading">
            Loading events...
          </p>
  
        ) : events.length === 0 ? (
  
          <div className="glass-card empty-events-state">
  
            <h2 className="empty-events-title">
              No Events Found
            </h2>
  
            <p className="empty-events-description">
  
              Start creating events to
              engage your club members.
  
            </p>
  
          </div>
  
        ) : (
  
          <section className="workspace-grid">
  
            {events.map((event) => (
  
              <EventWorkspaceCard
              key={event._id}
              event={event}
              onManage={
                setSelectedEvent
              }
            />
  
            ))}
  
          </section>
  
        )}
        {showModal && (
        <CreateEventModal
          onClose={() =>
            setShowModal(false)
          }
          onEventCreated={
            fetchEvents
          }
        /> 
        )}

        {selectedEvent && (
        
        <EventDetailsModal
          eventId={selectedEvent._id}
          onClose={() =>
            setSelectedEvent(null)
          }
          onEventDeleted={
            fetchEvents
          }
        />
        
        )}

      </DashboardLayout>
    );
  };
  
  export default ClubEventsPage;