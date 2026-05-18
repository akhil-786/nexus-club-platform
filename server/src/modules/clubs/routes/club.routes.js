const express = require("express");

const {
  createClub,
  assignClubAdmin,
  getSingleClub,
  getAllClubs,
  removeClubAdmin,
  deleteClub,
  createClubAdmin,
  getAllClubAdmins,
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

router.get( "/",
  protect,
  authorizeRoles(
    "college_admin"
  ),
  getAllClubs
);

router.get("/admins",
  protect,
  authorizeRoles("college_admin"),
  getAllClubAdmins
);
  

router.get("/:clubId",
    protect,
    checkClubAccess,
    getSingleClub
);

router.post(
  "/create-admin",
  protect,
  authorizeRoles("college_admin"),
  createClubAdmin
);

router.put(
  "/remove-admin",
  protect,
  authorizeRoles("college_admin"),
  removeClubAdmin
);


router.delete(
  "/delete/:clubId",
  protect,
  authorizeRoles("college_admin"),
  deleteClub
);


module.exports = router;