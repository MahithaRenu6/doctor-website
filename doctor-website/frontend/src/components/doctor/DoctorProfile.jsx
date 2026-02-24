import { FaUserMd, FaEnvelope, FaHospital, FaStethoscope } from "react-icons/fa";

const DoctorProfile = ({ user }) => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                {/* Profile Banner */}
                <div className="relative h-64 bg-slate-900 overflow-hidden flex items-end">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600 rounded-full blur-[120px] opacity-20"></div>
                    <div className="relative z-10 px-12 pb-12 w-full flex justify-between items-end">
                        <div>
                            <span className="px-3 py-1 bg-primary-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Official Profile</span>
                            <h2 className="text-4xl font-black text-white tracking-tight">{user.name}</h2>
                        </div>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Verified License</button>
                    </div>
                </div>

                <div className="px-12 pb-12">
                    {/* Floating Avatar */}
                    <div className="relative -top-12 mb-[-48px] inline-block">
                        <div className="w-40 h-40 rounded-[42px] bg-white p-2.5 shadow-2xl border border-slate-50">
                            <div className="w-full h-full rounded-[32px] bg-slate-100 flex items-center justify-center text-primary-600 text-5xl font-black shadow-inner overflow-hidden">
                                <FaUserMd />
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Stats Section */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="flex-1 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Satisfaction</p>
                                    <h3 className="text-2xl font-black text-slate-900">4.9/5.0</h3>
                                </div>
                                <div className="flex-1 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Experience</p>
                                    <h3 className="text-2xl font-black text-slate-900">12+ Years</h3>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                                    <div className="w-2 h-4 bg-primary-600 rounded-full"></div>
                                    Specialization Details
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary-100 transition-all group">
                                        <div className="p-3 bg-primary-50 text-primary-600 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all">
                                            <FaStethoscope />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Department</p>
                                            <p className="text-sm font-bold text-slate-900">General Medicine</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary-100 transition-all group">
                                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <FaHospital />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Clinic Location</p>
                                            <p className="text-sm font-bold text-slate-900">Health One Center</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Banner */}
                        <div className="bg-slate-900 rounded-[40px] p-8 text-white flex flex-col justify-between">
                            <div>
                                <h4 className="text-lg font-black tracking-tight mb-2">Connect Directly</h4>
                                <p className="text-slate-400 text-xs font-bold leading-relaxed">Secure communication line for professional inquiries.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <FaEnvelope className="text-primary-400" />
                                    <span className="text-xs font-bold truncate">{user.email}</span>
                                </div>
                                <button className="w-full py-4 bg-primary-600 hover:bg-primary-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary-500/10">Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
