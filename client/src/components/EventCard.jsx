import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users} from "lucide-react";

const EventCard = ({title,  date,  venue,  attendees,  gradient}) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      transition={{ duration: 0.3 }}
      className={`event-card ${gradient}`}
    >

      <div className="event-overlay"></div>

      <div className="event-content">

        <div className="event-date">
          <CalendarDays size={18} />
          <span>{date}</span>
        </div>


        <h3 className="event-title">
          {title}
        </h3>


        <div className="event-meta">

          <div className="event-meta-item">
            <MapPin size={18} />
            <span>{venue}</span>
          </div>

          <div className="event-meta-item">
            <Users size={18} />
            <span>{attendees} Attendees</span>
          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default EventCard;