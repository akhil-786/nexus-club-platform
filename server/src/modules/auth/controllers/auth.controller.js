const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User =
  require("../models/user.model");

const Club =
  require("../../clubs/models/club.model");

const Event =
  require("../../events/models/event.model");

const transporter = require("../../../config/mail");


/* =====================================================
   REGISTER USER
===================================================== */

const registerUser =
  async (req, res) => {

    try {

      const {

        fullName,
        email,
        password,
        rollNumber,
        department,
        year,
        collegeId,
        clubId,

      } = req.body;


      /* VALIDATION */

      if (

        !fullName ||
        !email ||
        !password ||
        !rollNumber ||
        !department ||
        !year ||
        !collegeId ||
        !clubId

      ) {

        return res.status(400)
          .json({

            success: false,

            message:
              "All fields are required",
          });
      }


      /* EMAIL VALIDATION */

      if (
        !validator.isEmail(email)
      ) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Invalid email format",
          });
      }


      /* PASSWORD VALIDATION */

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


      if (
        !passwordRegex.test(password)
      ) {

        return res.status(400)
          .json({

            success: false,

            message:

              "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
          });
      }


      /* EXISTING USER */

      const existingUser =
        await User.findOne({
          email,
        });


      if (existingUser) {

        return res.status(400)
          .json({

            success: false,

            message:
              "User already exists",
          });
      }


      /* HASH PASSWORD */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      /* CREATE USER */

      const user =
        await User.create({

          fullName,

          email,

          password:
            hashedPassword,

          rollNumber,

          department,

          year,

          collegeId,

          clubId,
        });


      const safeUser = {

        _id:
          user._id,

        fullName:
          user.fullName,

        email:
          user.email,

        role:
          user.role,

        rollNumber:
          user.rollNumber,

        department:
          user.department,

        year:
          user.year,

        collegeId:
          user.collegeId,

        clubId:
          user.clubId,

        status:
          user.status,

        avatar:
          user.avatar,
      };


      return res.status(201)
        .json({

          success: true,

          message:

            "Registration successful. Awaiting admin approval.",

          user:
            safeUser,
        });

    } catch (error) {

      console.error(error);

      return res.status(500)
        .json({

          success: false,

          message:
            "Server Error",
        });
    }
};


/* =====================================================
   LOGIN USER
===================================================== */

const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;


      if (
        !email ||
        !password
      ) {

        return res.status(400)
          .json({

            success: false,

            message:

              "Email and password are required",
          });
      }


      const user =
        await User.findOne({
          email,
        });


      if (!user) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Invalid credentials",
          });
      }


      const isPasswordMatched =
        await bcrypt.compare(

          password,

          user.password
        );


      if (!isPasswordMatched) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Invalid credentials",
          });
      }


      if (
        user.status ===
        "pending"
      ) {

        return res.status(403)
          .json({

            success: false,

            message:

              "Your account is awaiting admin approval",
          });
      }


      if (
        user.status ===
        "rejected"
      ) {

        return res.status(403)
          .json({

            success: false,

            message:

              "Your registration was rejected",
          });
      }


      if (
        user.status ===
        "suspended"
      ) {

        return res.status(403)
          .json({

            success: false,

            message:

              "Your account has been suspended",
          });
      }


      /* JWT TOKEN */

      const token =
        jwt.sign(

          {

            id:
              user._id,

            role:
              user.role,

            collegeId:
              user.collegeId,

            clubId:
              user.clubId,
          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "7d",
          }
        );


      const safeUser = {

        _id:
          user._id,

        fullName:
          user.fullName,

        email:
          user.email,

        role:
          user.role,

        rollNumber:
          user.rollNumber,

        department:
          user.department,

        year:
          user.year,

        collegeId:
          user.collegeId,

        clubId:
          user.clubId,

        status:
          user.status,

        avatar:
          user.avatar,
      };


      return res.status(200)
        .json({

          success: true,

          message:
            "Login successful",

          token,

          user:
            safeUser,
        });

    } catch (error) {

      console.error(error);

      return res.status(500)
        .json({

          success: false,

          message:
            "Server Error",
        });
    }
};


/* =====================================================
   FORGOT PASSWORD
===================================================== */

const forgotPassword =
  async (req, res) => {

    try {

      const { email } =
        req.body;


      const user =
        await User.findOne({
          email,
        });


      if (!user) {

        return res.status(404)
          .json({

            success: false,

            message:
              "User not found",
          });
      }


      const resetToken =

        crypto
          .randomBytes(32)
          .toString("hex");


      user.resetPasswordToken =
        resetToken;


      user.resetPasswordExpire =

        Date.now() +

        15 * 60 * 1000;


      await user.save();


      const resetUrl =

        `http://localhost:5173/reset-password/${resetToken}`;


      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to:
          user.email,

        subject:
          "Password Reset Request",

        html: `

          <div
            style="
              font-family:
              Arial,sans-serif;
              padding:20px;
            "
          >

            <h2>
              Reset Your Password
            </h2>

            <p>

              Click the button below
              to reset your password.

            </p>

            <a
              href="${resetUrl}"

              style="
                display:inline-block;
                padding:12px 20px;
                background:#2563eb;
                color:white;
                text-decoration:none;
                border-radius:8px;
                margin-top:12px;
              "
            >

              Reset Password

            </a>

            <p
              style="
                margin-top:20px;
                color:#64748b;
              "
            >

              This link expires in
              15 minutes.

            </p>

          </div>
        `,
      });


      return res.status(200)
        .json({

          success: true,

          message:

            "Reset password link sent to email",
        });

    } catch (error) {

      console.error(error);

      return res.status(500)
        .json({

          success: false,

          message:
            "Server Error",
        });
    }
};


/* =====================================================
   RESET PASSWORD
===================================================== */

const resetPassword =
  async (req, res) => {

    try {

      const { token } =
        req.params;


      const { password } =
        req.body;


      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


      if (
        !passwordRegex.test(password)
      ) {

        return res.status(400)
          .json({

            success: false,

            message:

              "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
          });
      }


      const user =
        await User.findOne({

          resetPasswordToken:
            token,

          resetPasswordExpire: {
            $gt: Date.now(),
          },
        });


      if (!user) {

        return res.status(400)
          .json({

            success: false,

            message:

              "Invalid or expired token",
          });
      }


      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      user.password =
        hashedPassword;


      user.resetPasswordToken =
        undefined;


      user.resetPasswordExpire =
        undefined;


      await user.save();


      return res.status(200)
        .json({

          success: true,

          message:

            "Password reset successful",
        });

    } catch (error) {

      console.error(error);

      return res.status(500)
        .json({

          success: false,

          message:
            "Server Error",
        });
    }
};

const getPendingUsers = async (req,res) => {
    try{
        const users = await User.find({
            status: "pending",
        }).select("-password");

        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const approveUser = async (req, res) => {
    try {
      const { id } = req.params;
  
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
  
      user.status = "approved";

      await user.save();


      // Find Club
      const club = await Club.findById(
        user.clubId
      );

      if (club) {
      
        // Prevent Duplicate Members
        const alreadyMember =
          club.members.some(
            (memberId) =>
              memberId.toString() ===
              user._id.toString()
          );
        
        if (!alreadyMember) {
        
          club.members.push(user._id);
        
          await club.save();
        }
      }
  
  
      return res.status(200).json({
        success: true,
        message: "User approved successfully",
      });
  
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
};

const rejectUser = async (req, res) => {
    try {
      const { id } = req.params;
  
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
  
      user.status = "rejected";
  
      await user.save();
  
  
      return res.status(200).json({
        success: true,
        message: "User rejected successfully",
      });
  
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
};

const getApprovedUsers = async (req, res) => {
    try {
      const users = await User.find({

          clubId: req.user.clubId,

          status:
            "approved",

          role:
            "student",
        })
        .select("-password");
      res.status(200).json({
        success: true,
        users,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch approved users",
      });
    }
};

const getMyProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select("-password");


      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }


      return res.status(200).json({
        success: true,
        user,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch profile",
      });
    }
};

const updateProfile =
  async (req, res) => {

    try {

      const {
        fullName,
        avatar,
      } = req.body;


      const user =
        await User.findById(
          req.user.id
        );


      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }


      if (fullName) {

        user.fullName =
          fullName;
      }


      if (avatar) {

        user.avatar =
          avatar;
      }


      await user.save();


      return res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",

        user,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to update profile",
      });
    }
};

const getCollegeAnalytics = async (req, res) => {

    try {

      const totalStudents =
        await User.countDocuments({

          role: "student",

          collegeId:
            req.user.collegeId,
        });

        const today = new Date();

          today.setHours(0, 0, 0, 0);

        const totalActiveEvents = await Event.countDocuments({ eventDate: { $gte: today },
         collegeId:
         req.user.collegeId,
        });


      const totalClubAdmins =
        await User.countDocuments({

          role: "club_admin",

          collegeId:
            req.user.collegeId,
        });


      return res.status(200).json({

        success: true,

        analytics: {

          totalStudents,

          totalClubAdmins,

          totalActiveEvents,

        },
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch analytics",

      });
    }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getPendingUsers,
  approveUser,
  rejectUser,
  getApprovedUsers,
  getMyProfile,
  updateProfile,
  getCollegeAnalytics,
};