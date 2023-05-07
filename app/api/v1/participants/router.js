const express = require("express");
const router = express();
const {
  getAllLandingPage,
  getDetailLandingPage,
  signup,
  signin,
  activeParticipant,
  getDashboard
} = require("./controller");

const {authenticateParticipant} = require('../../../middleware/auth')

router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);

router.get("/order", authenticateParticipant, getDashboard);

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);

router.put("/active", activeParticipant);

module.exports = router;
