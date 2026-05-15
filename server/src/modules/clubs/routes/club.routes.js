const express = require("express");

const {
  createClub,
  assignClubAdmin,
  getSingleClub,
} = require("../controllers/club.controller");

const {
  protect,
  authorizeRoles,
} = require("../../../middleware/auth.middleware");

const {
  checkClubAccess,
} = require("../../../middleware/clubAccess.middleware");

const router = express.Router();


// Create Club
router.post(
  "/create",
  protect,
  authorizeRoles("college_admin"),
  createClub
);

router.put(
    "/assign-admin",
    protect,
    authorizeRoles("college_admin"),
    assignClubAdmin
)

router.get("/:clubId",
    protect,
    checkClubAccess,
    getSingleClub
);


module.exports = router;