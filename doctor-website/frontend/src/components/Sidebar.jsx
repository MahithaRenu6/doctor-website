import { motion } from "framer-motion";
import { FaHome, FaCalendarPlus, FaList, FaUser, FaSignOutAlt, FaTimes, FaUserMd } from "react-icons/fa";

const Sidebar = ({ role, activeTab, setActiveTab, isOpen, setIsOpen, logout }) => {
    const menus = role === 'patient' ? [
        { name: "Home", icon: FaHome, id: "home" },
        { name: "Book Appointment", icon: FaCalendarPlus, id: "book" },
        { name: "My Appointments", icon: FaList, id: "appointments" },
        { name: "Profile", icon: FaUser, id: "profile" },
    ] : [
        { name: "Dashboard", icon: FaHome, id: "home" },
        { name: "Appointments", icon: FaList, id: "appointments" },
        { name: "Schedule", icon: FaCalendarPlus, id: "schedule" },
        { name: "Profile", icon: FaUser, id: "profile" },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.div
                className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="flex items-center justify-between p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                            <FaUserMd />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">RMP Book</h2>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <FaTimes />
                    </button>
                </div>

                <div className="flex-1 px-4 space-y-1.5 overflow-y-auto pt-4">
                    <div className="text-[10px] uppercase font-black text-slate-400 tracking-[.2em] px-4 mb-4">Main Menu</div>
                    {menus.map((menu) => (
                        <button
                            key={menu.id}
                            onClick={() => {
                                setActiveTab(menu.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all group ${activeTab === menu.id
                                ? "bg-primary-50 text-primary-600 shadow-sm shadow-primary-100"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <div className={`p-2 rounded-xl transition-colors ${activeTab === menu.id ? 'bg-white shadow-sm' : 'bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-100'}`}>
                                <menu.icon className="text-lg" />
                            </div>
                            {menu.name}
                        </button>
                    ))}
                </div>

                <div className="p-6 mt-auto">
                    <div className="bg-slate-50 rounded-3xl p-4 mb-4">
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all group"
                        >
                            <div className="p-2 bg-white rounded-xl group-hover:bg-red-100 transition-colors">
                                <FaSignOutAlt className="text-lg" />
                            </div>
                            Logout
                        </button>
                    </div>
                    <div className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Version 2.0.4</div>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
