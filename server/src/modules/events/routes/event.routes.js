const express = require("express");

const {
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  markAttendance,
} = require("../controllers/event.controller");

const {
  protect,
  authorizeRoles,
} = require(
  "../../../middleware/auth.middleware"
);

const router = express.Router();


// Create Event
router.post(
  "/create",
  protect,
  authorizeRoles("club_admin"),
  createEvent
);

router.put("/update/:eventId",
    protect,
    authorizeRoles("club_admin"),
    updateEvent
);

router.delete("/delete/:eventId",
    protect,
    authorizeRoles("club_admin"),
    deleteEvent
);

router.post("/register/:eventId",
    protect,
    authorizeRoles("student"),
    registerForEvent
);

router.put("/attendance/:eventId",
    protect,
    authorizeRoles("club_admin"),
    markAttendance
);

module.exports = router;