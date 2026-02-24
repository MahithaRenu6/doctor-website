import { FaUserCircle, FaEnvelope, FaIdBadge } from "react-icons/fa";

const PatientProfile = ({ user }) => {
    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                {/* Profile Header Background */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                </div>

                <div className="px-10 pb-12">
                    {/* Avatar Block */}
                    <div className="relative -top-16 mb-[-40px]">
                        <div className="w-32 h-32 rounded-[32px] bg-white p-2 shadow-2xl inline-block border border-slate-50">
                            <div className="w-full h-full rounded-[24px] bg-primary-600 flex items-center justify-center text-white text-4xl font-black shadow-inner">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h2>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">Verified Patient</span>
                                <p className="text-slate-400 font-bold text-sm">Member since 2024</p>
                            </div>
                        </div>
                        <button className="btn-secondary py-2.5 px-6 text-xs shadow-lg shadow-slate-200/40">Edit Profile</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <div className="flex items-center gap-5 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 border border-slate-100 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                <FaEnvelope className="text-xl" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Contact Method</p>
                                <p className="text-slate-900 font-bold">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 border border-slate-100 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                <FaIdBadge className="text-xl" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Personal Identity</p>
                                <p className="text-slate-900 font-bold font-mono text-xs">{user._id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 p-8 bg-slate-50 rounded-[32px] border border-slate-100/50 text-center">
                        <div className="max-w-sm mx-auto">
                            <h4 className="text-slate-900 font-black text-sm mb-2">Need to change sensitive data?</h4>
                            <p className="text-xs text-slate-400 font-bold leading-relaxed mb-4">
                                For security reasons, changes to your ID or verified name must be approved by our administration team.
                            </p>
                            <button className="text-primary-600 font-black text-xs uppercase tracking-widest hover:underline underline-offset-4">Open Support Ticket</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
