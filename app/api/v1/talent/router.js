const express = require("express");
const router = express();
const {
    create,
    index,
    find,
    update,
    destroy,
} = require("./controller");

router.post("/talent", create);
router.get("/talent", index);
router.get("/talent/:id", find);
router.put("/talent/:id", update);
router.delete("/talent/:id", destroy);

module.exports = router;
