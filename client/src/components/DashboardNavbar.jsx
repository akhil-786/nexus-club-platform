import { NavLink } from "react-router-dom";

const DashboardNavbar = () => {

  return (
    <nav className="dashboard-navbar">

      <div className="dashboard-navbar-content">

        {/* LOGO */}

        <h1 className="dashboard-logo">
          Nexus Club
        </h1>


        {/* NAVIGATION */}

        <div className="dashboard-nav-links">

          <NavLink
            to="/club-dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "dashboard-nav-item dashboard-nav-active"
                : "dashboard-nav-item"
            }
          >
            Dashboard
          </NavLink>


          <NavLink
            to="/club-dashboard/events"
            className={({ isActive }) =>
              isActive
                ? "dashboard-nav-item dashboard-nav-active"
                : "dashboard-nav-item"
            }
          >
            Events
          </NavLink>


          <NavLink
            to="/club-dashboard/members"
            className={({ isActive }) =>
              isActive
                ? "dashboard-nav-item dashboard-nav-active"
                : "dashboard-nav-item"
            }
          >
            Members
          </NavLink>


          <NavLink
            to="/club-dashboard/attendance"
            className={({ isActive }) =>
              isActive
                ? "dashboard-nav-item dashboard-nav-active"
                : "dashboard-nav-item"
            }
          >
            Attendance
          </NavLink>


          <NavLink
            to="/club-dashboard/requests"
            className={({ isActive }) =>
              isActive
                ? "dashboard-nav-item dashboard-nav-active"
                : "dashboard-nav-item"
            }
          >
            Requests
          </NavLink>

        </div>


        {/* PROFILE */}

        <div className="dashboard-profile-avatar">
          P
        </div>

      </div>

    </nav>
  );
};

export default DashboardNavbar;