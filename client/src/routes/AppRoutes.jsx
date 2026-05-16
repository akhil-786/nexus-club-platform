import { BrowserRouter, Router, Route, Routes} from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentDashboard from "../pages/StudentDashboard";
import ClubAdminDashboard from "../pages/admin/ClubAdminDashboard"
import ProtectedRoute from "./ProtectedRoute";

import ClubEventsPage from "../pages/admin/ClubEventsPage";
import ClubMembersPage from "../pages/admin/ClubMembersPage";
import ClubAttendancePage from "../pages/admin/ClubAttendancePage";
import ClubRequestsPage from "../pages/admin/ClubRequestsPage";

const AppRoutes = () => {
    return (
         <BrowserRouter>
            <Routes>
                <Route path="/" element= {<LandingPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>}/>
               
                <Route path="/student-dashboard" 
                    element={<ProtectedRoute allowedRoles={["student"]}>
                    <StudentDashboard/>
                    </ProtectedRoute>
                    }
                />

                <Route path="/club-dashboard"  
                    element={<ProtectedRoute allowedRoles={["club_admin"]}>
                    <ClubAdminDashboard/>
                    </ProtectedRoute>
                    }
                />
                <Route
                  path="/club-dashboard/events"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "club_admin"
                      ]}
                    >
                      <ClubEventsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/club-dashboard/members"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "club_admin"
                      ]}
                    >
                      <ClubMembersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/club-dashboard/attendance"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "club_admin"
                      ]}
                    >
                      <ClubAttendancePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/club-dashboard/requests"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "club_admin"
                      ]}
                    >
                      <ClubRequestsPage />
                    </ProtectedRoute>
                  }
                />
            </Routes>
         </BrowserRouter>
    );
};

export default AppRoutes;