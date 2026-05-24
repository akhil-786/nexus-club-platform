import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  Menu,
  X,
} from "lucide-react";
import { toast } from "react-toastify";  


const DashboardNavbar = () => {

  const [
    mobileMenu,
    setMobileMenu
  ] = useState(false);


  const [
    showLogoutModal,
    setShowLogoutModal
  ] = useState(false);


  const navigate =
    useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      toast.success(
        "Logged out successfully"
      );
      navigate("/login");
  };


  return (

    <nav className="dashboard-navbar">

      <div className="dashboard-navbar-content">

        {/* LOGO */}

        <h1 className="dashboard-logo">
          Nexus Club
        </h1>


        {/* DESKTOP NAV */}

        <div className="dashboard-nav-links">

          {user?.role ===
            "club_admin" && (
            <>

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
                to="/club-dashboard/requests"
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-nav-item dashboard-nav-active"
                    : "dashboard-nav-item"
                }
              >
                Requests
              </NavLink>

            </>
          )}


          {user?.role ===
            "student" && (
            <>

              <NavLink
                to="/student-dashboard"
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
                to="/student-dashboard/events"
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-nav-item dashboard-nav-active"
                    : "dashboard-nav-item"
                }
              >
                Events
              </NavLink>


              <NavLink
                to="/student-dashboard/my-events"
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-nav-item dashboard-nav-active"
                    : "dashboard-nav-item"
                }
              >
                My Events
              </NavLink>


              <NavLink
                to="/student-dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-nav-item dashboard-nav-active"
                    : "dashboard-nav-item"
                }
              >
                Profile
              </NavLink>

            </>
          )}


          {user?.role ===
            "college_admin" && (
            <>

              <NavLink
                to="/college-dashboard"
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
                to="/college-dashboard/clubs"
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-nav-item dashboard-nav-active"
                    : "dashboard-nav-item"
                }
              >
                Clubs
              </NavLink>


              <NavLink
                to="/college-dashboard/club-admins"
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-nav-item dashboard-nav-active"
                    : "dashboard-nav-item"
                }
              >
                Club Admins
              </NavLink>

            </>
          )}

        </div>


        {/* RIGHT */}

        <div className="dashboard-navbar-right">

          <div className="dashboard-profile-avatar">
            P
          </div>


          {/* DESKTOP LOGOUT */}

          <button
            onClick={() =>
              setShowLogoutModal(true)
            }
            className="dashboard-logout-btn desktop-logout-btn"
          >
            Logout
          </button>


          {/* MOBILE MENU BUTTON */}

          <button
            className="mobile-menu-btn"

            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
          >

            {mobileMenu
              ? <X size={28} />
              : <Menu size={28} />}

          </button>

        </div>

      </div>


      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="mobile-dashboard-menu">

          {user?.role ===
            "club_admin" && (
            <>

              <NavLink
                to="/club-dashboard"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Dashboard
              </NavLink>


              <NavLink
                to="/club-dashboard/events"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Events
              </NavLink>


              <NavLink
                to="/club-dashboard/members"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Members
              </NavLink>


              <NavLink
                to="/club-dashboard/requests"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Requests
              </NavLink>

            </>
          )}


          {user?.role ===
            "student" && (
            <>

              <NavLink
                to="/student-dashboard"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Dashboard
              </NavLink>


              <NavLink
                to="/student-dashboard/events"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Events
              </NavLink>


              <NavLink
                to="/student-dashboard/my-events"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                My Events
              </NavLink>


              <NavLink
                to="/student-dashboard/profile"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Profile
              </NavLink>

            </>
          )}


          {user?.role ===
            "college_admin" && (
            <>

              <NavLink
                to="/college-dashboard"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Dashboard
              </NavLink>


              <NavLink
                to="/college-dashboard/clubs"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Clubs
              </NavLink>


              <NavLink
                to="/college-dashboard/club-admins"
                className="mobile-dashboard-link"

                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Club Admins
              </NavLink>

            </>
          )}


          {/* MOBILE LOGOUT */}

          <button
            onClick={() => {

              setMobileMenu(false);

              setShowLogoutModal(true);
            }}

            className="mobile-dashboard-link dashboard-mobile-logout"
          >
            Logout
          </button>

        </div>

      )}


      {/* LOGOUT MODAL */}

      {showLogoutModal && (

        <div className="modal-overlay">

          <div className="confirm-modal glass-card">

            <h2 className="confirm-title">
              Confirm Logout
            </h2>


            <p className="confirm-text">

              Are you sure you want
              to logout from your
              account?

            </p>


            <div className="confirm-actions">

              <button
                className="secondary-btn"

                onClick={() =>
                  setShowLogoutModal(
                    false
                  )
                }
              >
                Cancel
              </button>


              <button
                className="danger-btn"

                onClick={() => {

                  handleLogout();

                  setShowLogoutModal(
                    false
                  );
                }}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </nav>
  );
};

export default DashboardNavbar;