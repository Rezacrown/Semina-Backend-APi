const express = require("express");
const router = express();
const {
  getAllLandingPage,
  getDetailLandingPage,
  signup,
  signin,
  activeParticipant,
  getDashboard,
  checkout,
  getAllPayment,
} = require("./controller");

const { authenticateParticipant } = require("../../../middleware/auth");

router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);
router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/active", activeParticipant);


// order checkout

router.get("/orders", authenticateParticipant, getDashboard);
router.post("/checkout", authenticateParticipant, checkout);

router.get("/payments/:organizer", authenticateParticipant, getAllPayment);

module.exports = router;
