const AnalyticsCard = ({
    label,
    value,
    growth,
  }) => {
  
    return (
      <div className="glass-card analytics-card">
  
        <div className="analytics-card-top">
  
          <p className="analytics-label">
            {label}
          </p>
  
  
          <div className="analytics-indicator"></div>
  
        </div>
  
  
        <h2 className="analytics-value">
          {value}
        </h2>
  
  
        <p className="analytics-growth">
          {growth}
        </p>
  
      </div>
    );
  };
  
  export default AnalyticsCard;