const User = require('../models/userModel');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    try {
        // Find all users with role 'doctor' and select only necessary public fields
        const doctors = await User.find({ role: 'doctor' }).select('name email department');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDoctors
};
