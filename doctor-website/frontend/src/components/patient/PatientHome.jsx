import { motion } from "framer-motion";
import { FaCalendarCheck, FaClock, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const PatientHome = ({ user, appointments }) => {
    const safeAppointments = Array.isArray(appointments) ? appointments : [];

    const stats = {
        total: safeAppointments.length,
        pending: safeAppointments.filter(a => a.status === 'pending').length,
        approved: safeAppointments.filter(a => a.status === 'approved').length,
        rejected: safeAppointments.filter(a => a.status === 'rejected').length,
    };

    const nextAppointment = safeAppointments
        .filter(a => a.status === 'approved')
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header section with Date & Greeting */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Hello, {user?.name?.split(' ')[0] || 'User'}!</h1>
                    <p className="text-slate-500 font-bold">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-bold text-slate-600">Health System Active</span>
                </div>
            </div>

            {/* Welcome Banner Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-primary-900 rounded-[32px] p-8 md:p-12 text-white shadow-2xl shadow-primary-900/20"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-600 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-xl">
                    <div className="text-primary-300 font-black uppercase tracking-widest text-xs mb-4">Patient Overview</div>
                    <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Your health journey, <br /> all in one place.</h2>
                    <p className="text-primary-100/80 text-lg mb-8">Access your appointments, medical records and collaborate with our specialists seamlessly.</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl">
                            <div className="text-2xl font-black">{stats.total}</div>
                            <div className="text-xs font-bold text-primary-300">Total Records</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl">
                            <div className="text-2xl font-black">{stats.approved}</div>
                            <div className="text-xs font-bold text-primary-300">Active Appts</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Booked", value: stats.total, icon: FaCalendarCheck, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                    { label: "Pending", value: stats.pending, icon: FaClock, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
                    { label: "Scheduled", value: stats.approved, icon: FaCheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
                    { label: "Cancelled", value: stats.rejected, icon: FaTimesCircle, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} ${stat.border} border text-2xl`}>
                            <stat.icon />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Split content: Next Appt and Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-7 gap-8">
                <div className="xl:col-span-4 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                            <div className="w-2 h-6 bg-primary-600 rounded-full"></div>
                            Up Next
                        </h3>
                        {nextAppointment && <span className="text-xs font-black text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full uppercase tracking-widest">Confimed Slot</span>}
                    </div>

                    {nextAppointment ? (
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-accent-600 rounded-[28px] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
                            <div className="relative bg-slate-50 border border-slate-100 rounded-[24px] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center border border-slate-100">
                                    <span className="text-[10px] font-black text-slate-400 uppercase">{nextAppointment.date.split(' ')[0]}</span>
                                    <span className="text-xl font-black text-primary-600">{nextAppointment.date.split(' ')[1]}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-black text-slate-900 mb-1">{nextAppointment.doctorName}</h4>
                                    <p className="text-slate-500 font-bold flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        {nextAppointment.department} specialist
                                    </p>
                                    <div className="mt-4 flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-primary-600 text-sm font-black">
                                            <FaClock className="text-xs" /> {nextAppointment.timeSlot}
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full sm:w-auto btn-primary py-3 px-6 shadow-sm">View Details</button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[24px] p-12 text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 text-slate-300 text-2xl">
                                <FaCalendarCheck />
                            </div>
                            <p className="text-slate-500 font-bold text-lg">No upcoming appointments</p>
                            <p className="text-slate-400 text-sm mt-1">Book a slot with our specialist to get started.</p>
                        </div>
                    )}
                </div>

                <div className="xl:col-span-3 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <div className="w-2 h-6 bg-accent-600 rounded-full"></div>
                        Recent History
                    </h3>
                    <div className="space-y-6">
                        {safeAppointments.slice(0, 4).map((app, i) => (
                            <div key={i} className="flex items-center gap-4 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${app.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                    <FaCheckCircle className="text-sm" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-900 truncate">{app.doctorName}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{app.date}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${app.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {app.status}
                                </div>
                            </div>
                        ))}
                        {safeAppointments.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-slate-400 italic font-medium">No activity data found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientHome;
