const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");

router.post("/event", create);
router.get("/event", index);
router.get("/event/:id", find);
router.put("/event/:id", update);
router.delete("/event/:id", destroy);

module.exports = router;
