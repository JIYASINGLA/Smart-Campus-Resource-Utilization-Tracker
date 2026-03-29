export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized: No user data found"
        });
      }

      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Forbidden: Insufficient permissions"
        });
      }

      next();

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};