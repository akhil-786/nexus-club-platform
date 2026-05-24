import { BrowserRouter, Router, Route, Routes} from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentDashboard from "../pages/student/StudentDashboard";
import ClubAdminDashboard from "../pages/admin/ClubAdminDashboard"
import ProtectedRoute from "./ProtectedRoute";

import ClubEventsPage from "../pages/admin/ClubEventsPage";
import ClubMembersPage from "../pages/admin/ClubMembersPage";
import ClubAttendancePage from "../pages/admin/ClubAttendancePage";
import ClubRequestsPage from "../pages/admin/ClubRequestsPage";
import StudentEventsPage from "../pages/student/StudentEventsPage";
import MyEventsPage from "../pages/student/MyEventsPage";
import StudentProfilePage from "../pages/student/StudentProfilePage";
import CollegeDashboard from "../pages/collegeAdmin/CollegeDashboard";
import ClubsPage from "../pages/collegeAdmin/ClubsPage";
import ManageClubPage from "../pages/collegeAdmin/ManageClubPage";
import ClubAdminsPage from "../pages/collegeAdmin/clubAdminsPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const AppRoutes = () => {
    return (
         <BrowserRouter>
            <Routes>
                <Route path="/" element= {<LandingPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage/>}
/>
               
                <Route path="/student-dashboard" 
                    element={<ProtectedRoute allowedRoles={["student"]}>
                    <StudentDashboard/>
                    </ProtectedRoute>
                    }
                />

                <Route path="/student-dashboard/events" 
                    element={<ProtectedRoute allowedRoles={["student"]}>
                    <StudentEventsPage/>
                    </ProtectedRoute>
                    }
                />
                <Route path="/student-dashboard/my-events" 
                    element={<ProtectedRoute allowedRoles={["student"]}>
                    <MyEventsPage/>
                    </ProtectedRoute>
                    }
                />
                <Route path="/student-dashboard/profile" 
                    element={<ProtectedRoute allowedRoles={["student"]}>
                    <StudentProfilePage/>
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
                 <Route path="/college-dashboard"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "college_admin"
                      ]}
                    >
                      <CollegeDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="/college-dashboard/clubs"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "college_admin"
                      ]}
                    >
                      <ClubsPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="/college-dashboard/clubs/:clubId"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "college_admin"
                      ]}
                    >
                      <ManageClubPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/college-dashboard/club-admins"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "college_admin"
                      ]}
                    >
                      <ClubAdminsPage />
                    </ProtectedRoute>
                  }
                />

            </Routes>
         </BrowserRouter>
    );
};

export default AppRoutes;