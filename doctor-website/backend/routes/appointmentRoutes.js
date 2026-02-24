const express = require('express');
const router = express.Router();
const {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware');

router.post('/', protect, role(['patient']), bookAppointment);
router.get('/', protect, getAppointments);
router.put('/:id', protect, role(['doctor']), updateAppointmentStatus);

module.exports = router;
