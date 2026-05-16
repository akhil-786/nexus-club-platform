
const ActivityFeedCard = ({activity}) => {
    return (
        <div className="glass-card activity-card">
            <div className="activity-indicator"></div>

            <div>
                <h3 className="activity-title">{activity.title}</h3>
                <p className="activity-time">{activity.time}</p>
            </div>
        </div>
    );
};

export default ActivityFeedCard;