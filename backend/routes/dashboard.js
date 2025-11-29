const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dc = require('../controllers/dashboardController');

router.get('/employee', auth, dc.employeeStats);
router.get('/manager', auth, dc.managerStats);

module.exports = router;
