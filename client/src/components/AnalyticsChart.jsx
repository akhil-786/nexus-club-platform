import {ResponsiveContainer, AreaChart, Area, XAxis, Tooltip} from "recharts";
  
  const data = [
    {
      month: "Jan",
      engagement: 30,
    },
  
    {
      month: "Feb",
      engagement: 45,
    },
  
    {
      month: "Mar",
      engagement: 52,
    },
  
    {
      month: "Apr",
      engagement: 48,
    },
  
    {
      month: "May",
      engagement: 70,
    },
  
    {
      month: "Jun",
      engagement: 82,
    },
  ];
  
  const AnalyticsChart = () => {
  
    return (
      <div className="glass-card analytics-chart-card">
  
        <div className="analytics-chart-header">
  
          <div>
  
            <h2 className="analytics-chart-title">
              Engagement Trends
            </h2>
  
            <p className="analytics-chart-subtitle">
              Student participation growth
            </p>
  
          </div>
  
        </div>
  
  
        <div className="analytics-chart-wrapper">
  
          <ResponsiveContainer
            width="100%"
            height={300}
          >
  
            <AreaChart data={data}>
  
              <defs>
  
                <linearGradient
                  id="colorEngagement"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
  
                  <stop
                    offset="5%"
                    stopColor="#06b6d4"
                    stopOpacity={0.4}
                  />
  
                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0}
                  />
  
                </linearGradient>
  
              </defs>
  
  
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />
  
  
              <Tooltip />
  
  
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#colorEngagement)"
                strokeWidth={4}
              />
  
            </AreaChart>
  
          </ResponsiveContainer>
  
        </div>
  
      </div>
    );
  };
  
  export default AnalyticsChart;