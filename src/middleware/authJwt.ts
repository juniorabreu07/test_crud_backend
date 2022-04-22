const jwt = require("jsonwebtoken");
require('dotenv').config()

export const verifyToken = (req: any, res: any, next: any) => {
  let token = req.session.token;
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.MY_SECRET_KEY_JWT, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
