import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserMd, FaCalendarAlt, FaCheck, FaStethoscope, FaArrowRight, FaArrowLeft, FaSpinner } from "react-icons/fa";

const BookAppointment = ({ onSuccess }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        department: "",
        doctorName: "",
        date: "",
        timeSlot: ""
    });

    const [doctors, setDoctors] = useState([]);

    // Fetch doctors on mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get("/api/doctors");
                setDoctors(data);
            } catch (error) {
                console.error("Failed to fetch doctors", error);
            }
        };
        fetchDoctors();
    }, []);

    // Filter unique departments from fetched doctors
    const departments = [...new Set(doctors.map(doc => doc.department).filter(Boolean))];



    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post("/api/appointments", formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setMessage({ type: 'success', text: "Appointment Booked Successfully!" });
            setTimeout(() => {
                setStep(1);
                setFormData({ department: "", doctorName: "", date: "", timeSlot: "" });
                setMessage(null);
                onSuccess();
            }, 2000);
        } catch (error) {
            setMessage({ type: 'error', text: "Booking Failed. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-slate-900 leading-tight">Book Appointment</h2>
                <p className="text-slate-500 font-bold mt-1">Reserve your slot with our world-class specialists</p>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/20 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-0"></div>

                {/* Progress Stepper */}
                <div className="relative z-10 flex items-center justify-between mb-16 max-w-lg mx-auto">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center gap-3 relative group">
                            <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center font-black transition-all duration-500 border-2 ${step === s ? "bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30 scale-110" :
                                    step > s ? "bg-emerald-500 border-emerald-500 text-white" :
                                        "bg-white border-slate-100 text-slate-300"
                                }`}>
                                {step > s ? <FaCheck className="text-sm" /> : s}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s ? 'text-slate-900' : 'text-slate-300'}`}>
                                {s === 1 ? 'Specialty' : s === 2 ? 'Schedule' : 'Confirm'}
                            </span>
                            {s < 3 && (
                                <div className={`absolute left-[calc(100%+0.5rem)] top-6 w-[calc(100%+2rem)] h-0.5 bg-slate-100 -z-10 rounded-full`}>
                                    <div className={`h-full bg-emerald-500 transition-all duration-700 ${step > s ? 'w-full' : 'w-0'}`}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-4 mb-8 rounded-2xl flex items-center gap-3 font-bold border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                            {message.type === 'success' ? <FaCheck /> : '!'}
                        </div>
                        {message.text}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                                    <FaStethoscope className="text-xl" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900">Choose Specialty</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {departments.map((dept) => (
                                    <button
                                        key={dept}
                                        onClick={() => setFormData({ ...formData, department: dept, doctorName: "" })}
                                        className={`group relative p-8 rounded-[28px] border-2 transition-all duration-300 ${formData.department === dept
                                                ? "border-primary-600 bg-primary-50/50 shadow-xl shadow-primary-500/10"
                                                : "border-slate-50 hover:border-primary-200 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${formData.department === dept ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-slate-400 group-hover:text-primary-600 shadow-sm border border-slate-100'
                                            }`}>
                                            <FaStethoscope className="text-2xl" />
                                        </div>
                                        <span className={`block text-lg font-black transition-colors ${formData.department === dept ? 'text-primary-600' : 'text-slate-900'}`}>{dept}</span>
                                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Medical Care</p>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-12 flex justify-end">
                                <button
                                    onClick={handleNext}
                                    disabled={!formData.department}
                                    className="btn-primary py-4 px-10 shadow-xl shadow-primary-500/20 flex items-center gap-3"
                                >
                                    Select Schedule <FaArrowRight />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-10"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div>
                                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest block mb-4">Expert Doctor</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                                            <FaUserMd />
                                        </div>
                                        <select
                                            required
                                            className="input-field pl-12 pr-12 appearance-none h-16"
                                            value={formData.doctorName}
                                            onChange={(e) => {
                                                const selectedDoc = doctors.find(d => d.name === e.target.value);
                                                setFormData({
                                                    ...formData,
                                                    doctorName: e.target.value,
                                                    department: selectedDoc ? selectedDoc.department : formData.department
                                                });
                                            }}
                                        >
                                            <option value="">Search for a doctor...</option>
                                            {doctors
                                                .filter(doc => !formData.department || doc.department === formData.department)
                                                .map((doc) => (
                                                    <option key={doc._id} value={doc.name}>
                                                        {doc.name} {formData.department ? '' : `(${doc.department})`}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest block mb-4">Preferred Date</label>
                                    <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-custom">
                                        {(() => {
                                            const days = [];
                                            const today = new Date();
                                            for (let i = 0; i < 14; i++) {
                                                const d = new Date(today);
                                                d.setDate(today.getDate() + i);
                                                days.push({
                                                    full: d.toISOString().split('T')[0],
                                                    day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                                                    date: d.getDate()
                                                });
                                            }
                                            return days.map((dayItem) => (
                                                <button
                                                    key={dayItem.full}
                                                    onClick={() => setFormData({ ...formData, date: dayItem.full })}
                                                    className={`flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-300 ${formData.date === dayItem.full
                                                            ? 'bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-500/30'
                                                            : 'bg-white border-slate-100 text-slate-400 hover:border-primary-100 hover:bg-slate-50 hover:text-slate-600'
                                                        }`}
                                                >
                                                    <span className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${formData.date === dayItem.full ? 'text-primary-200' : 'text-slate-400'}`}>{dayItem.day}</span>
                                                    <span className="text-2xl font-black">{dayItem.date}</span>
                                                </button>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-black text-slate-900 uppercase tracking-widest block mb-4">Available Slots</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {[
                                        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
                                        "11:00 AM", "11:30 AM", "04:00 PM", "04:30 PM",
                                        "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
                                    ].map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setFormData({ ...formData, timeSlot: slot })}
                                            className={`py-3.5 px-2 rounded-xl text-xs font-black border-2 transition-all duration-300 ${formData.timeSlot === slot
                                                    ? 'bg-accent-500 text-white border-accent-500 shadow-lg shadow-accent-500/20'
                                                    : 'bg-white border-slate-50 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 flex justify-between items-center border-t border-slate-50">
                                <button onClick={handleBack} className="text-slate-400 hover:text-slate-900 font-bold flex items-center gap-2 transition-colors">
                                    <FaArrowLeft /> Back to Specialty
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!formData.doctorName || !formData.date || !formData.timeSlot}
                                    className="btn-primary py-4 px-10 shadow-xl shadow-primary-500/20 flex items-center gap-3"
                                >
                                    Review Booking <FaArrowRight />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-md mx-auto"
                        >
                            <div className="text-center mb-10">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[28px] flex items-center justify-center mx-auto mb-6 text-3xl border border-emerald-100 animate-pulse-slow">
                                    <FaCalendarAlt />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Check Your Details</h3>
                                <p className="text-slate-500 font-bold">Please review your appointment info</p>
                            </div>

                            <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-8 space-y-6 mb-12">
                                <div className="flex justify-between items-start">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Specialist</span>
                                    <div className="text-right">
                                        <p className="font-black text-slate-900">{formData.doctorName}</p>
                                        <p className="text-primary-600 text-xs font-bold">{formData.department}</p>
                                    </div>
                                </div>
                                <div className="h-px bg-slate-100"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Date</span>
                                    <p className="font-black text-slate-900">{formData.date}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Time Slot</span>
                                    <p className="font-black text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">{formData.timeSlot}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full btn-primary py-5 rounded-[22px] shadow-2xl shadow-primary-500/30 flex items-center justify-center gap-3 group"
                                >
                                    {loading ? <FaSpinner className="animate-spin" /> : <>Complete Booking <FaCheck className="group-hover:scale-125 transition-transform" /></>}
                                </button>
                                <button onClick={handleBack} className="py-3 text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors">Edit schedule details</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BookAppointment;
