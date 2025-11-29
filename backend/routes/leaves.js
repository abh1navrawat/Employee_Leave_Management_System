const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const leaveController = require('../controllers/leaveController');

router.post('/', auth, leaveController.applyLeave);
router.get('/my-requests', auth, leaveController.myRequests);
router.delete('/:id', auth, leaveController.cancelRequest);

// manager
router.get('/all', auth, leaveController.allRequests);
router.get('/pending', auth, leaveController.pendingRequests);
router.put('/:id/approve', auth, leaveController.approve);
router.put('/:id/reject', auth, leaveController.reject);

module.exports = router;
