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

router.get("/me", protect, (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Protected route accessed",
      user: req.user,
    });
  });

module.exports = router;