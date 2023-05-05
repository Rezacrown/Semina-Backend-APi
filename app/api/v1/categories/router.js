const router = require("express").Router();

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middleware/auth");

const {
  createCategory,
  findAllCategories,
  findOneCategory,
  update,
  destoryCategory,
} = require("./controller");

// route
router.get(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  findAllCategories
);
router.post(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  createCategory
);
router.get("/categories/:id", authenticateUser, authorizeRoles('organizer'), findOneCategory);
router.put(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destoryCategory
);

module.exports = router;
