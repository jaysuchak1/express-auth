const express = require('express');
const router = express.Router();
const userModel = require('../models/users');
const jwt = require("jsonwebtoken");
const AuthMiddleware = require('../middleware/auth');
/* Post user Login. */
router.post('/login', async (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await userModel.findOne({
      username,
      password
    });
    if (!user) {
      return res.status(401).send({
        message: 'Invalid User.'
      });
    }

    const access_token = jwt.sign({
      user
    }, process.env.JWT_SECRET, {
      expiresIn: "3h"
    });

    return res.cookie("access_token", access_token).json({
      access_token,
      user,
      message: 'User logged in successfully.'
    });
  } catch (error) {
    return res.send(error);
  }
});

/* GET users listing. */
router.post('/logout', AuthMiddleware(), async (req, res, next) => {
  try {
    return res.clearCookie("access_token").json({
      message: 'User logged out successfully.'
    });
  } catch (error) {
    res.send(error);
  }
});
/* GET users listing. */
router.get('/', AuthMiddleware(), async (req, res, next) => {
  try {
    const users = await userModel.find({}, "uuid group username password");
    return res.send(users);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;