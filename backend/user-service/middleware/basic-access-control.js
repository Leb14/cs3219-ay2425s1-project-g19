const jwt = require("jsonwebtoken");
const {
  findUserById:_findUserById,
  findUserByEmail:_findUserByEmail
} = require("../model/repository.js");

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // request auth header: `Authorization: Bearer + <access_token>`
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // load latest user info from DB
    const dbUser = await _findUserById(user.id);
    if (!dbUser) {
      return res.status(401).json({ message: "Authentication failed" });
    }
 
    req.user = { id: dbUser.id, username: dbUser.username, email: dbUser.email, isAdmin: dbUser.isAdmin };
    next();
  });
}

const verifyIsAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized to access this resource" });
  }
}

const verifyIsOwnerOrAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }

  const userIdFromReqParams = req.params.id;
  const userIdFromToken = req.user.id;
  if (userIdFromReqParams === userIdFromToken) {
    return next();
  }

  return res.status(403).json({ message: "Not authorized to access this resource" });
}

const verifyIsOwnerOrAdminByEmail = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }

  const userEmailFromReqParams = req.params.email;
  const userEmailFromToken = req.user.email;
  if (userEmailFromReqParams === userEmailFromToken) {
    return next();
  }

  return res.status(403).json({ message: "Not authorized to access this resource" });
}

module.exports = {
  verifyAccessToken,
  verifyIsAdmin,
  verifyIsOwnerOrAdmin,
  verifyIsOwnerOrAdminByEmail
};