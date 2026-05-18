import DashboardNavbar from "../components/DashboardNavbar";
// import { useNavigate } from "react-router-dom";

const DashboardLayout = ({children,}) => {

  // const navigate = useNavigate();

  
  return (
    <div className="dashboard-page">

      {/* GLOWS */}
      <div className="glow-purple"></div>
      <div className="glow-cyan"></div>


      <DashboardNavbar />

      {/* <button
  onClick={handleLogout}
  className="danger-btn"
>
  Logout
</button> */}


      <main className="dashboard-main-content">
        {children}
        
      </main>

      

    </div>
  );
};

export default DashboardLayout;