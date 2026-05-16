const InsightCard = ({
    title,
    subtitle,
    stat1Label,
    stat1Value,
    stat2Label,
    stat2Value,
  }) => {
  
    return (
      <div className="insight-card">
  
        <div className="insight-header">
  
          <div>
  
            <h2 className="insight-title">
              {title}
            </h2>
  
            <p className="insight-subtitle">
              {subtitle}
            </p>
  
          </div>
  
        </div>
  
  
        {/* CHART */}
  
        <div className="chart-placeholder">
  
          <div className="chart-glow top-0 left-0"></div>
  
          <div className="chart-glow bottom-0 right-0"></div>
  
          <div className="chart-line"></div>
  
        </div>
  
  
        {/* STATS */}
  
        <div className="insight-stats">
  
          <div>
  
            <p className="insight-stat-label">
              {stat1Label}
            </p>
  
            <h3 className="insight-stat-value">
              {stat1Value}
            </h3>
  
          </div>
  
  
          <div>
  
            <p className="insight-stat-label">
              {stat2Label}
            </p>
  
            <h3 className="insight-stat-value">
              {stat2Value}
            </h3>
  
          </div>
  
        </div>
  
      </div>
    );
  };
  
  export default InsightCard;