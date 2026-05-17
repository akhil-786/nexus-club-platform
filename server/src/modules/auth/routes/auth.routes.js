const express = require("express");

const {
    protect,
    authorizeRoles,
  } = require("../../../middleware/auth.middleware");

const {
    registerUser,
    loginUser,
    getPendingUsers,
    approveUser,
    rejectUser,
    getApprovedUsers,
    getMyProfile,
    updateProfile,
    getCollegeAnalytics,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/pending-users",
    protect,
    authorizeRoles("club_admin", "college_admin"),
    getPendingUsers
);

router.put("/approve-user/:id",
    protect,
    authorizeRoles("club_admin", "college_admin"),
    approveUser
);

router.put( "/reject-user/:id",
    protect,
    authorizeRoles("club_admin", "college_admin"),
    rejectUser
);

router.get("/approved-users",
  protect,
  authorizeRoles("club_admin","college_admin"),
  getApprovedUsers
)

router.get("/me",
  protect,
  getMyProfile
);

router.put("/update-profile",
protect,
updateProfile
);

router.get("/analytics",
  protect,
  authorizeRoles("college_admin"),
  getCollegeAnalytics
);

module.exports = router;