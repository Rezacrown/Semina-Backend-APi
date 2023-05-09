const router = require("express").Router();

const uploadImage = require('../../../middleware/multer')
const {authenticateUser} = require('../../../middleware/auth')

const {
create
} = require("./controller");

router.post("/image", authenticateUser, uploadImage.single('avatar'), create);

module.exports = router;
