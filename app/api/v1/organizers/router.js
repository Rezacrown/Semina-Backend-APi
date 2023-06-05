const express = require("express");
const router = express();
const { createCMSOrganizer, createCMSUser, getCMSUsers, getAdmin } = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middleware/auth");


// organizer
router.post('/organizer', authenticateUser, authorizeRoles('owner'), createCMSOrganizer)

// admin
router.post('/admin', authenticateUser, createCMSUser)


// users
router.get('/users', authenticateUser, authorizeRoles('owner', 'organizer'), getCMSUsers)

module.exports = router;
