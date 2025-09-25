const jwt = require("jsonwebtoken");

// exports.authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Chưa đăng nhập" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) return res.status(403).json({ error: "Token không hợp lệ" });
//     req.userId = payload.userId;
//     req.role = payload.role;
//     next();
//   });
// };

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.role !== role) {
      return res.status(403).json({ error: "Không đủ quyền" });
    }
    next();
  };
};

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
