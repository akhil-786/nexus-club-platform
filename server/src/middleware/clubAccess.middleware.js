const Club = require("../modules/clubs/models/club.model");


const checkClubAccess = async (
  req,
  res,
  next
) => {
  try {

    const { clubId } = req.params;


    // Find Club
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }


    // College Admin → Full Access
    if (
      req.user.role === "college_admin"
    ) {
      req.club = club;
      return next();
    }


    // Club Admin Access
    if (
      req.user.role === "club_admin"
    ) {

      const isAdmin = club.clubAdmins.some(
        (adminId) =>
          adminId.toString() ===
          req.user.id
      );

      if (!isAdmin) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied for this club",
        });
      }

      req.club = club;

      return next();
    }


    // Student Access
    if (
      req.user.role === "student"
    ) {

      if (
        req.user.clubId !==
        club._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Students can access only their club",
        });
      }

      req.club = club;

      return next();
    }


    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  checkClubAccess,
};