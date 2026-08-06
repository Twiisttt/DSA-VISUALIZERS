const jwt = require("jsonwebtoken");


// Authentication middleware
function authMiddleware(req, res, next) {

  // Get Authorization header
  const authHeader = req.headers.authorization;


  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {

    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });

  }


  // Extract token
  const token = authHeader.split(" ")[1];


  try {

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Store logged-in user's ID in request
    req.userId = decoded.userId;


    // Continue to protected route
    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });

  }
}


module.exports = authMiddleware;