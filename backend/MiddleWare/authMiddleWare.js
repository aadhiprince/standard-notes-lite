const SECRET_KEY = "AadhiPrince";

const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res
      .status(401)
      .json({ success: false, message: "Headers is not specified" });
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Token is invalid" });
  }
};
module.exports = authMiddleWare;
