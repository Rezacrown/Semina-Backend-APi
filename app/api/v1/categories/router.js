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
  authorizeRoles("organizer", "owner"),
  findAllCategories
);
router.post(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  createCategory
);
router.get("/categories/:id", authenticateUser, authorizeRoles('organizer', 'owner'), findOneCategory);
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
