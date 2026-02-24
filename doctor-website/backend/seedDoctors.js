const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

const doctors = [
    { name: "Dr. Aisha Sharma", email: "aisha.sharma@medicare.com", password: "Doctor@123", role: "doctor", department: "Cardiology" },
    { name: "Dr. Ravi Menon", email: "ravi.menon@medicare.com", password: "Doctor@123", role: "doctor", department: "Neurology" },
    { name: "Dr. Priya Nair", email: "priya.nair@medicare.com", password: "Doctor@123", role: "doctor", department: "Pediatrics" },
    { name: "Dr. Arjun Patel", email: "arjun.patel@medicare.com", password: "Doctor@123", role: "doctor", department: "Orthopedics" },
    { name: "Dr. Meena Iyer", email: "meena.iyer@medicare.com", password: "Doctor@123", role: "doctor", department: "Dermatology" },
    { name: "Dr. Suresh Reddy", email: "suresh.reddy@medicare.com", password: "Doctor@123", role: "doctor", department: "Gastroenterology" },
    { name: "Dr. Kavitha Rao", email: "kavitha.rao@medicare.com", password: "Doctor@123", role: "doctor", department: "Psychiatry" },
    { name: "Dr. Nikhil Verma", email: "nikhil.verma@medicare.com", password: "Doctor@123", role: "doctor", department: "Oncology" },
    { name: "Dr. Divya Krishnan", email: "divya.krishnan@medicare.com", password: "Doctor@123", role: "doctor", department: "Ophthalmology" },
    { name: "Dr. Rahul Bhatt", email: "rahul.bhatt@medicare.com", password: "Doctor@123", role: "doctor", department: "Pulmonology" }
];

const seedDoctors = async () => {
    try {
        console.log('🌱 Seeding doctors...');
        for (const doc of doctors) {
            const exists = await User.findOne({ email: doc.email });
            if (!exists) {
                // We pass plain password here because the User model pre-save hook will hash it.
                // This ensures consistency with how normal users are created.
                await User.create({
                    name: doc.name,
                    email: doc.email,
                    password: doc.password,
                    role: doc.role,
                    department: doc.department
                });
            }
        }
        console.log('✅ Doctors seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding doctors:', error);
    }
};

module.exports = seedDoctors;
