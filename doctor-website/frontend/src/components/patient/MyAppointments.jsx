import { useState } from "react";
import { FaSearch, FaFilePdf, FaFilter } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyAppointments = ({ appointments }) => {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const filteredAppointments = appointments.filter(app => {
        const matchesStatus = filter === "all" || app.status === filter;
        const matchesSearch = app.doctorName.toLowerCase().includes(search.toLowerCase()) ||
            app.department.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
            <div className="p-8 border-b border-slate-50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 leading-tight">My Appointments</h2>
                        <p className="text-slate-400 font-bold text-sm mt-1">Track and manage your medical visits</p>
                    </div>

                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300" />
                            <input
                                type="text"
                                placeholder="Search by name or department..."
                                className="input-field pl-11 py-3 text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex gap-2 mt-8 overflow-x-auto pb-2 scrollbar-hide">
                    {['all', 'pending', 'approved', 'rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border-2 ${filter === status
                                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/20'
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto p-4">
                <table className="min-w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-slate-400 text-left">
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em]">Doctor Information</th>
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em]">Schedule</th>
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-center">Current Status</th>
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((app) => (
                                <tr key={app._id} className="group hover:bg-slate-50 transition-all duration-300">
                                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white rounded-l-2xl border-y border-l border-transparent group-hover:border-slate-100 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600 font-black border border-slate-100">
                                                {app.doctorName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900">{app.doctorName}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{app.department}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all">
                                        <div className="font-bold text-slate-700">{app.date}</div>
                                        <div className="text-xs text-slate-400 font-medium">{app.timeSlot}</div>
                                    </td>
                                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all text-center">
                                        <span className={`inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border
                                            ${app.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                app.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                    'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white rounded-r-2xl border-y border-r border-transparent group-hover:border-slate-100 transition-all text-right">
                                        <button className="text-[10px] font-black text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-colors uppercase tracking-widest">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-2xl text-slate-200">
                                            <FaFilter />
                                        </div>
                                        <p className="text-slate-400 font-black">No appointments found</p>
                                        <p className="text-xs text-slate-300 mt-2 font-bold uppercase tracking-widest">Try adjusting your filters or search</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;
