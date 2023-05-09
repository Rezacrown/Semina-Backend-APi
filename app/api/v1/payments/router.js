const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middleware/auth");


router.post("/payments", authenticateUser, authorizeRoles("organizer"), create);

router.get("/payments", authenticateUser, authorizeRoles("organizer"), index);

router.get(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  find
);

router.put(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);


module.exports = router;
