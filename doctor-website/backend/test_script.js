const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testFlow = async () => {
    try {
        console.log('--- Starting Test Flow ---');

        // 1. Register Doctor
        console.log('\n1. Registering Doctor...');
        const doctorRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Dr. House',
            email: 'house@example.com',
            password: 'password123',
            role: 'doctor'
        }).catch(err => {
            if (err.response && err.response.data.message === 'User already exists') {
                console.log('Doctor already exists, logging in...');
                return axios.post(`${API_URL}/auth/login`, {
                    email: 'house@example.com',
                    password: 'password123'
                });
            }
            throw err;
        });
        const doctorToken = doctorRes.data.token;
        console.log('Doctor Registered/Logged in. Token:', doctorToken ? 'Received' : 'Missing');

        // 2. Register Patient
        console.log('\n2. Registering Patient...');
        const patientRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'patient'
        }).catch(err => {
            if (err.response && err.response.data.message === 'User already exists') {
                console.log('Patient already exists, logging in...');
                return axios.post(`${API_URL}/auth/login`, {
                    email: 'john@example.com',
                    password: 'password123'
                });
            }
            throw err;
        });
        const patientToken = patientRes.data.token;
        console.log('Patient Registered/Logged in. Token:', patientToken ? 'Received' : 'Missing');

        // 3. Book Appointment (Patient)
        console.log('\n3. Booking Appointment...');
        const appointmentRes = await axios.post(`${API_URL}/appointments`, {
            doctorName: 'Dr. House',
            department: 'Cardiology',
            date: '2023-10-27',
            timeSlot: '10:00 AM'
        }, {
            headers: { Authorization: `Bearer ${patientToken}` }
        });
        console.log('Appointment Booked:', appointmentRes.data);
        const appointmentId = appointmentRes.data._id;

        // 4. View Appointments (Patient)
        console.log('\n4. Viewing Patient Appointments...');
        const patApps = await axios.get(`${API_URL}/appointments`, {
            headers: { Authorization: `Bearer ${patientToken}` }
        });
        console.log('Patient Appointments:', patApps.data.length);

        // 5. View Appointments (Doctor)
        console.log('\n5. Viewing Doctor Appointments...');
        const docApps = await axios.get(`${API_URL}/appointments`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log('Doctor Appointments:', docApps.data.length);

        // 6. Approve Appointment (Doctor)
        console.log('\n6. Approving Appointment...');
        const approvedRes = await axios.put(`${API_URL}/appointments/${appointmentId}`, {
            status: 'approved'
        }, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log('Appointment Approved. Status:', approvedRes.data.status);

        // 7. Verify Status (Patient)
        console.log('\n7. Verifying Status as Patient...');
        const verifyRes = await axios.get(`${API_URL}/appointments`, {
            headers: { Authorization: `Bearer ${patientToken}` }
        });
        const updatedApp = verifyRes.data.find(a => a._id === appointmentId);
        console.log('Verified Status:', updatedApp.status);

        console.log('\n--- Test Flow Completed Successfully ---');
    } catch (error) {
        console.error('\n!!! Test Failed !!!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
};

testFlow();
