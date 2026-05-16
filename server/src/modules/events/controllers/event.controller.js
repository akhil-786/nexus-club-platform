const Event = require("../models/event.model");

const Club = require("../../clubs/models/club.model");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      venue,
      eventDate,
      clubId,
    } = req.body;


    // Validation
    if (
      !title ||
      !description ||
      !venue ||
      !eventDate ||
      !clubId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }


    // Find Club
    const club = await Club.findById(
      clubId
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }


    // Ownership Validation
    const isAdmin = club.clubAdmins.some(
      (adminId) =>
        adminId.toString() ===
        req.user.id
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You can create events only for your own club",
      });
    }


    // Create Event
    const event = await Event.create({
      title,
      description,
      venue,
      eventDate,
      clubId,
      createdBy: req.user.id,
    });


    return res.status(201).json({
      success: true,
      message:
        "Event created successfully",
      event,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateEvent = async (
  req,
  res
) => {
  try {

    const { eventId } = req.params;

    const {
      title,
      description,
      venue,
      eventDate,
      status,
    } = req.body;


    // Find Event
    const event = await Event.findById(
      eventId
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }


    // Find Related Club
    const club = await Club.findById(
      event.clubId
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }


    // Ownership Validation
    const isAdmin = club.clubAdmins.some(
      (adminId) =>
        adminId.toString() ===
        req.user.id
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You can edit only your club events",
      });
    }


    // Update Fields
    if (title)
      event.title = title;

    if (description)
      event.description = description;

    if (venue)
      event.venue = venue;

    if (eventDate)
      event.eventDate = eventDate;

    if (status)
      event.status = status;


    await event.save();


    return res.status(200).json({
      success: true,
      message:
        "Event updated successfully",
      event,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteEvent = async (
  req,
  res
) => {
  try {

    const { eventId } = req.params;


    // Find Event
    const event = await Event.findById(
      eventId
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }


    // Find Related Club
    const club = await Club.findById(
      event.clubId
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }


    // Ownership Validation
    const isAdmin = club.clubAdmins.some(
      (adminId) =>
        adminId.toString() ===
        req.user.id
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You can delete only your club events",
      });
    }


    // Delete Event
    await Event.findByIdAndDelete(
      eventId
    );


    return res.status(200).json({
      success: true,
      message:
        "Event deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const registerForEvent = async (
  req,
  res
) => {
  try {

    const { eventId } = req.params;


    // Find Event
    const event = await Event.findById(
      eventId
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }


    // Find Related Club
    const club = await Club.findById(
      event.clubId
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }


    // Student Club Validation
    if (
  req.user.clubId.toString() !==
  club._id.toString()
){
      return res.status(403).json({
        success: false,
        message:
          "You can register only for your club events",
      });
    }


    // Prevent Duplicate Registration
    const alreadyRegistered =
      event.participants.some(
        (participantId) =>
          participantId.toString() ===
          req.user.id
      );

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message:
          "Already registered for this event",
      });
    }


    // Register Student
    event.participants.push(
      req.user.id
    );

    await event.save();


    return res.status(200).json({
      success: true,
      message:
        "Registered for event successfully",
      event,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const markAttendance = async (
  req,
  res
) => {
  try {

    const { eventId } = req.params;

    const { studentId } = req.body;


    // Find Event
    const event = await Event.findById(
      eventId
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }


    // Find Related Club
    const club = await Club.findById(
      event.clubId
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }


    // Ownership Validation
    const isAdmin = club.clubAdmins.some(
      (adminId) =>
        adminId.toString() ===
        req.user.id
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You can manage only your club events",
      });
    }


    // Check Registration
    const isParticipant =
      event.participants.some(
        (participantId) =>
          participantId.toString() ===
          studentId
      );

    if (!isParticipant) {
      return res.status(400).json({
        success: false,
        message:
          "Student is not registered for this event",
      });
    }


    // Prevent Duplicate Attendance
    const alreadyMarked =
      event.attendance.some(
        (attendanceId) =>
          attendanceId.toString() ===
          studentId
      );

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message:
          "Attendance already marked",
      });
    }


    // Mark Attendance
    event.attendance.push(studentId);

    await event.save();


    return res.status(200).json({
      success: true,
      message:
        "Attendance marked successfully",
      event,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllEvents = async (
  req,
  res
) => {
  try {

    let events = [];


    // STUDENT
    if (
      req.user.role === "student"
    ) {

      events = await Event.find({
        clubId: req.user.clubId,
      })
        .populate(
          "clubId",
          "name category"
        )
        .populate(
          "createdBy",
          "fullName email"
        )
        .sort({ createdAt: -1 });
    }


    // CLUB ADMIN
    else if (
      req.user.role === "club_admin"
    ) {

      const managedClubs =
        await Club.find({
          clubAdmins: req.user.id,
        });

      const clubIds = managedClubs.map(
        (club) => club._id
      );

      events = await Event.find({
        clubId: { $in: clubIds },
      })
        .populate(
          "clubId",
          "name category"
        )
        .populate(
          "createdBy",
          "fullName email"
        )
        .sort({ createdAt: -1 });
    }


    // COLLEGE ADMIN
    else if (
      req.user.role ===
      "college_admin"
    ) {

      const collegeClubs =
        await Club.find({
          collegeId:
            req.user.collegeId,
        });

      const clubIds =
        collegeClubs.map(
          (club) => club._id
        );

      events = await Event.find({
        clubId: { $in: clubIds },
      })
        .populate(
          "clubId",
          "name category"
        )
        .populate(
          "createdBy",
          "fullName email"
        )
        .sort({ createdAt: -1 });
    }


    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSingleEvent = async (
  req,
  res
) => {
  try {

    const { eventId } = req.params;


    const event = await Event.findById(
      eventId
    )
      .populate(
        "clubId",
        "name category"
      )
      .populate(
        "createdBy",
        "fullName email"
      )
      .populate(
        "participants",
        "fullName email rollNumber"
      )
      .populate(
        "attendance",
        "fullName email rollNumber"
      );


    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }


    // STUDENT ACCESS CONTROL
    if (
      req.user.role === "student"
    ) {

      if (
        req.user.clubId.toString() !==
        event.clubId._id.toString()
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Access denied for this event",
        });
      }
    }


    // CLUB ADMIN ACCESS CONTROL
    if (
      req.user.role === "club_admin"
    ) {

      const club = await Club.findById(
        event.clubId._id
      );

      const isAdmin =
        club.clubAdmins.some(
          (adminId) =>
            adminId.toString() ===
            req.user.id
        );

      if (!isAdmin) {

        return res.status(403).json({
          success: false,
          message:
            "Access denied for this event",
        });
      }
    }


    return res.status(200).json({
      success: true,
      event,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getClubEvents = async(req,res) => {
  try{
    const {clubId} = req.params;

    const events = await Event.find({

      clubId,
    })
    .populate(
      "createdBy",
      "fullName email"
    ).sort({eventDate: 1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch(error){
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  markAttendance,
  getAllEvents,
  getSingleEvent,
  getClubEvents,
};