const jwt = require("jsonwebtoken");


// Protect Middleware
const protect = async (req, res, next) => {
  try {
    let token;


    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }


    // No Token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided",
      });
    }


    // Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Attach User Data
    req.user = decoded;


    next();

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};


// Role Authorization Middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Insufficient permissions",
      });
    }

    next();
  };
};


module.exports = {
  protect,
  authorizeRoles,
};