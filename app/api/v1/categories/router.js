const router = require("express").Router();

const { createCategory, findAllCategories, findOneCategory, update, destoryCategory } = require("./controller");

router.post("/categories", createCategory);
router.get("/categories", findAllCategories);
router.get("/categories/:id", findOneCategory);
router.put("/categories/:id", update);
router.delete("/categories/:id", destoryCategory);

module.exports = router;
