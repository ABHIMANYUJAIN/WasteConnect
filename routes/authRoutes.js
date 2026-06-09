const express = require("express");
const router = express.Router();
console.log("Auth Routes Loaded");

const {
  registerUser,
} = require("../controllers/authController");

router.get("/test", (req, res) => {
  res.json({
    message: "Auth Route Working",
  });
});

router.post("/register", registerUser);

module.exports = router;