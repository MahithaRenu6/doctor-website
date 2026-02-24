import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; 
import axios from "axios";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";

const DoctorAppointments = ({ appointments, onSuccess }) => {
    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(`/api/appointments/${id}`, { status }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            onSuccess(); // Refresh
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        }
    };

    const columns = {
        pending: { title: "Pending Request", icon: FaClock, color: "text-warning", bg: "bg-orange-50" },
        approved: { title: "Approved", icon: FaCheck, color: "text-success", bg: "bg-green-50" },
        rejected: { title: "Rejected", icon: FaTimes, color: "text-danger", bg: "bg-red-50" }
    };

    return (
        <div className="h-full flex flex-col space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 leading-tight">Appointment Board</h2>
                    <p className="text-slate-500 font-bold">Manage and orchestrate patient requests</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest hover:border-slate-200 transition-all">List View</button>
                    <button className="px-4 py-2 bg-primary-600 rounded-xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:scale-105 transition-all">Kanban Board</button>
                </div>
            </div>

            <div className="flex-1 min-h-[500px] overflow-x-auto pb-6 scrollbar-custom">
                <div className="flex gap-8 h-full min-w-[1000px]">
                    {Object.entries(columns).map(([status, col]) => (
                        <div key={status} className={`flex-1 flex flex-col h-full bg-slate-50/50 rounded-[32px] border border-slate-100/50 p-6`}>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-6 rounded-full ${status === 'pending' ? 'bg-amber-400' : status === 'approved' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">{col.title}</h3>
                                </div>
                                <span className="bg-white border border-slate-100 flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full text-xs font-black text-slate-400 shadow-sm">
                                    {appointments.filter(a => a.status === status).length}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                                {appointments.filter(a => a.status === status).map((app) => (
                                    <div key={app._id} className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-black text-slate-900 group-hover:text-primary-600 transition-colors">{app.patientName}</h4>
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mt-0.5">{app.department}</p>
                                            </div>
                                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400 text-xs shadow-inner font-bold">
                                                {app.date.split('-').slice(1).reverse().join('/')}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="w-6 h-6 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center text-[10px]">
                                                <FaClock />
                                            </div>
                                            <p className="text-xs font-black text-slate-500">{app.timeSlot}</p>
                                        </div>

                                        {status === 'pending' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(app._id, 'approved')}
                                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md shadow-emerald-500/10"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                    className="flex-1 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        )}
                                        {status === 'approved' && (
                                            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Confirmed</span>
                                                <button
                                                    onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                    className="text-[10px] font-black text-slate-300 hover:text-rose-500 uppercase tracking-widest transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {appointments.filter(a => a.status === status).length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-30 select-none">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                            <col.icon className="text-2xl" />
                                        </div>
                                        <p className="text-xs font-black uppercase tracking-widest">No Activity</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointments;
