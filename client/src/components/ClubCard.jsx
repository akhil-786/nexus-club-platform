import { motion } from "framer-motion";

const ClubCard = ({
  title,
  description,
  gradient,
  icon,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className={`club-card ${gradient}`}
    >

      <div className="club-icon">
        {icon}
      </div>

      <h3 className="club-title">
        {title}
      </h3>

      <p className="club-description">
        {description}
      </p>

    </motion.div>
  );
};

export default ClubCard;