const router = require("express").Router();

const uploadImage = require('../../../middleware/multer')

const {
create
} = require("./controller");

router.post("/image", uploadImage.single('avatar'), create);

module.exports = router;
