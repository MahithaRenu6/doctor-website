import { motion } from "framer-motion";
import { FaUserInjured, FaCalendarCheck, FaChartLine, FaWallet } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DoctorHome = ({ user, appointments }) => {
    const safeAppointments = Array.isArray(appointments) ? appointments : [];

    // Calculate stats
    const stats = {
        patients: new Set(safeAppointments.map(a => a.patientName)).size,
        appointments: safeAppointments.length,
        today: safeAppointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
        earnings: safeAppointments.filter(a => a.status === 'approved').length * 50 // Mock $50 per appointment
    };

    // Mock data for chart - in real app, derive from appointments by date
    const data = [
        { name: 'Mon', apps: 4 },
        { name: 'Tue', apps: 3 },
        { name: 'Wed', apps: 7 },
        { name: 'Thu', apps: 5 },
        { name: 'Fri', apps: 8 },
        { name: 'Sat', apps: 6 },
        { name: 'Sun', apps: 2 },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header section with Stats & Greeting */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Welcome, Dr. {user?.name?.split(' ')[0] || 'Doctor'}</h1>
                    <p className="text-slate-500 font-bold">You have <span className="text-primary-600 underline underline-offset-4 decoration-2">{stats.today} appointments</span> scheduled for today</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary py-2.5 px-5 text-sm">Send Reminders</button>
                    <button className="btn-primary py-2.5 px-5 text-sm shadow-lg shadow-primary-500/20">View Schedule</button>
                </div>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Patients", value: stats.patients, icon: FaUserInjured, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                    { label: "Bookings", value: stats.appointments, icon: FaCalendarCheck, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
                    { label: "Daily Visits", value: stats.today, icon: FaChartLine, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
                    { label: "Rev Revenue", value: `$${stats.earnings}`, icon: FaWallet, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
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

            {/* Charts & Tasks Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                            <div className="w-2 h-6 bg-primary-600 rounded-full"></div>
                            Appointment Analytics
                        </h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs font-bold text-primary-600 bg-primary-50 rounded-lg">W</button>
                            <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-lg">M</button>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="apps"
                                    stroke="#0ea5e9"
                                    fillOpacity={1}
                                    fill="url(#colorApps)"
                                    strokeWidth={4}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <div className="w-2 h-6 bg-accent-600 rounded-full"></div>
                        Waitlist Queue
                    </h3>
                    <div className="space-y-4 flex-1">
                        {safeAppointments.filter(a => a.status === 'pending').slice(0, 4).map((app, i) => (
                            <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-50 hover:border-slate-100 hover:bg-white transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600 font-black text-sm border border-slate-100 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                    {app.patientName.charAt(0)}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="font-bold text-slate-900 truncate">{app.patientName}</h4>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{app.timeSlot}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-widest border border-amber-100">Pending</span>
                                </div>
                            </div>
                        ))}
                        {safeAppointments.filter(a => a.status === 'pending').length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200 text-2xl italic">
                                    <FaCalendarCheck />
                                </div>
                                <p className="text-slate-400 font-bold">Inbox is clear</p>
                                <p className="text-xs text-slate-300 mt-1">No pending requests found.</p>
                            </div>
                        )}
                    </div>
                    <button className="mt-6 w-full py-4 text-sm font-black text-slate-400 hover:text-primary-600 border-t border-slate-50 transition-colors">See all requests</button>
                </div>
            </div>
        </div>
    );
};

export default DoctorHome;
