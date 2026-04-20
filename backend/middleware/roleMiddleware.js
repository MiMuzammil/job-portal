export const adminOnly = (req, res, next) => {
  try {
    // Safety check (important)
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Role check
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};