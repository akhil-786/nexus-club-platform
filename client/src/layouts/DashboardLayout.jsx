import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = ({
  children,
}) => {

  return (
    <div className="dashboard-page">

      {/* GLOWS */}
      <div className="glow-purple"></div>
      <div className="glow-cyan"></div>


      <DashboardNavbar />


      <main className="dashboard-main-content">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;