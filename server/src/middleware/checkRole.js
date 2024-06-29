const checkRole = (req, res, next) => {

  if (req.user && req.user.role === "client") {
    next(); // Allow access to the route
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

export default checkRole;
