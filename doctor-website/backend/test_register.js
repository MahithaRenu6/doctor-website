const axios = require('axios');

const register = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'swamy',
            email: 'kolliswami784@gmail.com',
            password: 'password',
            role: 'patient'
        });
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
};

register();
