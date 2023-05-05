const express = require("express");
const router = express();
const {
  create,
  index,
  find,
  update,
  destroy,
  changeStatus,
} = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middleware/auth");

router.post("/event", authenticateUser, authorizeRoles("organizer"), create);
router.get("/event", authenticateUser, authorizeRoles("organizer"), index);
router.get("/event/:id", authenticateUser, authorizeRoles("organizer"), find);
router.put("/event/:id", authenticateUser, authorizeRoles("organizer"), update);
router.delete(
  "/event/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);

router.put(
  "/event/:id/status",
  authenticateUser,
  authorizeRoles("organizer"),
  changeStatus
);

module.exports = router;
