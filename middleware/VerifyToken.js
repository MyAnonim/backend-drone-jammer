import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("AUTH HEADER :", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("TOKEN :", token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    req.email = decoded.email;
    console.log(req.email);
    next();
  });
};
