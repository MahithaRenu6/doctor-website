import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const DoctorSchedule = ({ appointments }) => {
    const [date, setDate] = useState(new Date());

    // Filter appointments for selected date
    const selectedDateString = date.toISOString().split('T')[0];
    const dailyAppointments = appointments.filter(app =>
        app.date === selectedDateString && app.status === 'approved'
    ).sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full animate-fade-in">
            {/* Calendar Section */}
            <div className="lg:col-span-3 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 leading-tight">Schedule Overview</h2>
                        <p className="text-slate-500 font-bold">Planned medical sessions and appointments</p>
                    </div>
                </div>

                <div className="custom-calendar-container px-2">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="w-full border-none"
                        tileClassName={({ date, view }) => {
                            if (view === 'month') {
                                const dateString = date.toISOString().split('T')[0];
                                const hasApps = appointments.some(app => app.date === dateString && app.status === 'approved');
                                return hasApps ? 'has-appointments' : null;
                            }
                        }}
                    />
                </div>
            </div>

            {/* Daily List Section */}
            <div className="bg-slate-900 rounded-[40px] p-8 text-white flex flex-col h-full shadow-2xl shadow-slate-900/20">
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                            <FaCalendarAlt />
                        </div>
                        <div>
                            <p className="text-[10px] text-primary-400 font-black uppercase tracking-[0.2em]">{date.toLocaleDateString(undefined, { weekday: 'long' })}</p>
                            <h3 className="text-xl font-black text-white">{date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</h3>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl inline-block">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{dailyAppointments.length} Sessions</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                    {dailyAppointments.length > 0 ? (
                        dailyAppointments.map((app, i) => (
                            <div key={i} className="group p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-primary-400 text-xs" />
                                        <span className="text-sm font-black text-white">{app.timeSlot}</span>
                                    </div>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                </div>
                                <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{app.patientName}</h4>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{app.department} Consultation</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 opacity-20 flex flex-col items-center">
                            <FaClock className="text-4xl mb-4" />
                            <p className="font-black uppercase tracking-[0.3em] text-[10px]">No Appointments</p>
                        </div>
                    )}
                </div>

                <button className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Generate Report
                </button>
            </div>

            <style>{`
                .react-calendar { width: 100%; border: none !important; font-family: 'Inter', sans-serif !important; }
                .react-calendar__navigation { margin-bottom: 2rem; }
                .react-calendar__navigation button { font-weight: 900; color: #0F172A; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.75rem; }
                .react-calendar__month-view__weekdays { font-weight: 900; color: #94A3B8; text-transform: uppercase; font-size: 0.65rem; margin-bottom: 1rem; }
                .react-calendar__month-view__days__day { font-weight: 700; color: #475569; position: relative; height: 100px !important; }
                .react-calendar__tile--now { background: #F8FAFC !important; border-radius: 24px; color: #0284C7 !important; }
                .react-calendar__tile--active { background: #0F172A !important; border-radius: 24px; color: white !important; font-weight: 900; }
                .react-calendar__tile:hover { background: #F1F5F9; border-radius: 24px; }
                .has-appointments::after { content: ''; position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; background: #0284C7; border-radius: 50%; }
            `}</style>
        </div>
    );
};

export default DoctorSchedule;
