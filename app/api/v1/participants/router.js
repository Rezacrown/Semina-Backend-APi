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
  lupaPassword,
  confirmLupaPassword,
  checkingOtp
} = require("./controller");

const { authenticateParticipant } = require("../../../middleware/auth");

router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);
router.put("/active", activeParticipant);

// participant
router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/checking/otp", checkingOtp);
router.post("/auth/forgot-password", lupaPassword);
router.post("/auth/forgot-password/confirm", confirmLupaPassword);

// order checkout

router.get("/orders", authenticateParticipant, getDashboard);
router.post("/checkout", authenticateParticipant, checkout);

router.get("/payments/:organizer", authenticateParticipant, getAllPayment);



module.exports = router;
