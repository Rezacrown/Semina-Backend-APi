const express = require("express");
const router = express();
const {
    create,
    index,
    find,
    update,
    destroy,
} = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middleware/auth");

router.post("/talent", authenticateUser, authorizeRoles('organizer'), create);
router.get("/talent", authenticateUser, authorizeRoles('organizer'), index);
router.get("/talent/:id", authenticateUser, authorizeRoles('organizer'), find);
router.put("/talent/:id", authenticateUser, authorizeRoles('organizer'), update);
router.delete("/talent/:id", authenticateUser, authorizeRoles('organizer'), destroy);

module.exports = router;
