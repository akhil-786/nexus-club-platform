const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");


const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      collegeId,
      clubId,
    } = req.body;


    // Validation
    if (
      !fullName ||
      !email ||
      !password ||
      !collegeId ||
      !clubId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // Email Validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }


    // Password Length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }


    // Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }


    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create User
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      collegeId,
      clubId,
    });


    const safeUser = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        collegeId: user.collegeId,
        clubId: user.clubId,
        status: user.status,
        avatar: user.avatar,
      };
      
      return res.status(201).json({
        success: true,
        message:
          "Registration successful. Awaiting admin approval.",
        user: safeUser,
      });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginUser = async (req, res) => {
    try {
        const {email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        if(user.status === "pending"){
            return res.status(403).json({
                success: false,
                message: "Your account is awaiting admin approval",
            });
        }

        if(user.status === "rejected"){
            return res.status(403).json({
                success: false,
                message:
                  "Your registration was rejected",
              });
        }

        if (user.status === "suspended") {
            return res.status(403).json({
              success: false,
              message:
                "Your account has been suspended",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                collegeId: user.collegeId,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        const safeUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            collegeId: user.collegeId,
            clubId: user.clubId,
            status: user.status,
            avatar: user.avatar,
        };

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: safeUser,
        });  
    } 
    catch (error) {
        console.error(error);
    
        return res.status(500).json({
          success: false,
          message: "Server Error",
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


module.exports = {
  registerUser,
  loginUser,
  getPendingUsers,
  approveUser,
  rejectUser,
};