const Club = require("../models/club.model");
const User = require("../../auth/models/user.model");

const createClub = async (req, res) => {
  try {

    const {
      name,
      description,
      category,
    } = req.body;


    // Validation
    if (
      !name ||
      !description ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // Check Existing Club
    const existingClub = await Club.findOne({
      name,
      collegeId: req.user.collegeId,
    });


    if (existingClub) {
      return res.status(400).json({
        success: false,
        message:
          "Club already exists in this college",
      });
    }


    // Create Club
    const club = await Club.create({
      name,
      description,
      category,
      collegeId: req.user.collegeId,
      createdBy: req.user.id,
    });


    return res.status(201).json({
      success: true,
      message: "Club created successfully",
      club,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const assignClubAdmin = async (req, res) => {
  try {

    const { clubId, userId } = req.body;


    // Validation
    if (!clubId || !userId) {
      return res.status(400).json({
        success: false,
        message:
          "clubId and userId are required",
      });
    }


    // Find Club
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }


    // Find User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // Tenant Validation
    if (
      user.collegeId !== req.user.collegeId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Cannot assign admin from another college",
      });
    }


    // Prevent Duplicate Admin
    if (
      club.clubAdmins.includes(user._id)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "User is already a club admin",
      });
    }


    // Update User Role
    user.role = "club_admin";

    // Link User To Club
    user.clubId = club._id;

    await user.save();


    // Add Admin To Club
    club.clubAdmins.push(user._id);

    await club.save();


    return res.status(200).json({
      success: true,
      message:
        "Club admin assigned successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSingleClub = async (
  req,
  res
) => {
  try {

    const club = await Club.findById(
      req.params.clubId
    )
      .populate(
        "clubAdmins",
        "fullName email role"
      )
      .populate(
        "members",
        "fullName email rollNumber department year"
      );


    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }


    return res.status(200).json({
      success: true,
      club,
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
  createClub,
  assignClubAdmin,
  getSingleClub,
};