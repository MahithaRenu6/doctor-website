import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaCog, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';
import useClickOutside from '../../hooks/useClickOutside';

const NavDropdown = ({ user, isOpen, onClose, onLogout }) => {
    const dropdownRef = useRef(null);
    useClickOutside(dropdownRef, onClose);

    if (!isOpen) return null;

    // Role badge colors
    const roleColors = user.role === 'doctor'
        ? 'bg-emerald-500/10 text-emerald-600'
        : 'bg-cyan-500/10 text-cyan-600';

    return (
        <AnimatePresence>
            <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-16 right-0 w-72 bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-100/50 overflow-hidden z-50 transform origin-top-right"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center text-white text-xl font-black ${user.role === 'doctor' ? 'bg-emerald-500' : 'bg-primary-600'}`}>
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <h4 className="font-black text-slate-900 truncate">{user.name}</h4>
                            <p className="text-xs text-slate-400 font-bold truncate mb-2">{user.email}</p>
                            <span className={`w-fit px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'doctor' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50 text-primary-600'}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="p-3">
                    <Link to="/profile" onClick={onClose} className="flex items-center gap-3.5 px-4 py-3.5 text-sm font-bold text-slate-600 rounded-2xl hover:bg-slate-50 hover:text-primary-600 transition-all group">
                        <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                            <FaUserCircle className="text-lg text-slate-400 group-hover:text-primary-600" />
                        </div>
                        My Profile
                    </Link>
                    <Link to="/settings" onClick={onClose} className="flex items-center gap-3.5 px-4 py-3.5 text-sm font-bold text-slate-600 rounded-2xl hover:bg-slate-50 hover:text-primary-600 transition-all group">
                        <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                            <FaCog className="text-lg text-slate-400 group-hover:text-primary-600" />
                        </div>
                        Settings
                    </Link>

                    <div className="my-2 border-t border-slate-50"></div>

                    <button
                        onClick={() => { onLogout(); onClose(); }}
                        className="w-full flex items-center gap-3.5 px-4 py-3.5 text-sm font-black text-rose-500 rounded-2xl hover:bg-rose-50 transition-all group"
                    >
                        <div className="p-2 bg-rose-100/50 rounded-xl group-hover:bg-rose-500 group-hover:text-white transition-all text-rose-600">
                            <FaSignOutAlt className="text-lg" />
                        </div>
                        Sign Out
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NavDropdown;
