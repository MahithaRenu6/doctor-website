const Appointment = require('../models/appointmentModel');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const bookAppointment = async (req, res) => {
    try {
        const { doctorName, department, date, timeSlot } = req.body;

        if (!doctorName || !department || !date || !timeSlot) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const appointment = await Appointment.create({
            patientId: req.user.id,
            patientName: req.user.name,
            doctorName,
            department,
            date,
            timeSlot,
            status: 'pending'
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private (Patient & Doctor)
const getAppointments = async (req, res) => {
    try {
        let appointments;

        if (req.user.role === 'patient') {
            appointments = await Appointment.find({ patientId: req.user.id });
        } else if (req.user.role === 'doctor') {
            // Assuming doctorName matches the user's name. 
            // In a real app, strict linking via ID is better, but following requirement "doctorName" string matching.
            appointments = await Appointment.find({ doctorName: req.user.name });
        } else {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Doctor)
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Verify the appointment belongs to this doctor
        if (appointment.doctorName !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized to update this appointment' });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus
};
