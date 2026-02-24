import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHome, FaUserMd, FaNotesMedical, FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaCalendarAlt, FaColumns } from 'react-icons/fa';

const MobileDrawer = ({ isOpen, onClose, user, onLogout }) => {
    const navigate = useNavigate();

    // Mobile Links Configuration
    const links = [
        { name: "Home", path: "/", icon: FaHome },
        { name: "Doctors", path: "/doctors", icon: FaUserMd },
        { name: "Services", path: "/services", icon: FaNotesMedical },
    ];

    if (user) {
        if (user.role === 'patient') {
            links.push({ name: "Dashboard", path: "/patient-dashboard", icon: FaColumns });
            links.push({ name: "My Appointments", path: "/patient-dashboard", icon: FaCalendarAlt });
        } else {
            links.push({ name: "Dashboard", path: "/doctor-dashboard", icon: FaColumns });
            links.push({ name: "Appointments", path: "/doctor-dashboard", icon: FaCalendarAlt });
        }
    }

    const itemVariants = {
        closed: { opacity: 0, x: -20 },
        open: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.05, duration: 0.3 }
        })
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-20 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-2xl z-40 md:hidden overflow-y-auto border-t border-gray-100"
                    >
                        <div className="p-4 space-y-2">
                            {/* User Card */}
                            {user && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 border border-accent/10 flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 rounded-full shadow-sm bg-white flex items-center justify-center text-primary font-bold text-lg">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{user.name}</h3>
                                        <span className="text-xs font-bold text-accent uppercase tracking-wider">{user.role}</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Links */}
                            <div className="space-y-1">
                                {links.map((link, i) => (
                                    <motion.div
                                        key={link.path + link.name}
                                        custom={i}
                                        variants={itemVariants}
                                        initial="closed"
                                        animate="open"
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={onClose}
                                            className="flex items-center gap-4 p-4 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-primary transition-all active:scale-95"
                                        >
                                            <link.icon className="text-xl" />
                                            <span className="font-medium text-lg">{link.name}</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer Actions */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 pt-6 border-t border-gray-100 space-y-3"
                            >
                                {user ? (
                                    <button
                                        onClick={() => { onLogout(); onClose(); }}
                                        className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-red-50 text-danger font-bold hover:bg-red-100 transition"
                                    >
                                        <FaSignOutAlt /> Sign Out
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={onClose}
                                            className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition"
                                        >
                                            <FaSignInAlt /> Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={onClose}
                                            className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-accent/20 hover:shadow-accent/30 transition transform active:scale-95"
                                        >
                                            <FaUserPlus /> Register
                                        </Link>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileDrawer;
