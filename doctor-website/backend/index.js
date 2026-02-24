const express = require('express');
const connectDB = require('./config/db')

const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB().then(() => {
    require('./seedDoctors')();
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is runing in 5000")
})