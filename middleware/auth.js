"use strict";

const jwt = require("jsonwebtoken");
const AuthMiddleware = () => (req, res, next) => {
  if (req.cookies["access_token"] || req.headers["access_token"]) {
    const token = req.cookies["access_token"] || req.headers["access_token"];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Please login again!"
        });
      } else if (decoded) {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Please login again!"
    });
  }
};

module.exports = AuthMiddleware;