import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBell, FaTimes, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

// Hooks
import useScrolled from "../hooks/useScrolled";
import useMobileMenu from "../hooks/useMobileMenu";

// Components
import NavLink from "./common/NavLink";
import NavDropdown from "./common/NavDropdown";
import MobileDrawer from "./common/MobileDrawer";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // State & Hooks
    const scrolled = useScrolled(50);
    const { isOpen: isMobileOpen, toggle: toggleMobile, close: closeMobile } = useMobileMenu();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
        closeMobile();
    };

    // Navigation Links Config
    const navLinks = [
        { name: "Home", path: "/" },
        // { name: "Doctors", path: "/doctors" }, // Uncomment when page exists
    ];

    // Hide Navbar on specific routes
    const location = useLocation();
    const hideOnRoutes = ["/login", "/register", "/patient-dashboard", "/doctor-dashboard"];
    if (hideOnRoutes.includes(location.pathname)) {
        return null;
    }

    if (user) {
        if (user.role === 'patient') {
            // Dashboard link is redundant if we hide navbar on dashboard, keeping for Home/Service pages
            navLinks.push({ name: "Dashboard", path: "/patient-dashboard" });
            navLinks.push({ name: "My Appointments", path: "/patient-dashboard" });
        } else {
            navLinks.push({ name: "Dashboard", path: "/doctor-dashboard" });
            navLinks.push({ name: "Schedule", path: "/doctor-dashboard" });
        }
    }

    return (
        <>
            {/* Main Navbar Container */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
                    ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 py-2.5"
                    : "bg-white/40 backdrop-blur-md border-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 xl:px-12 flex justify-between items-center">

                    {/* LOGO SECTION */}
                    <Link to="/" className="flex items-center gap-3.5 group relative z-50">
                        <div className="w-11 h-11 rounded-2xl bg-primary-600 shadow-xl shadow-primary-500/20 flex items-center justify-center transform transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6.5 w-6.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-900 leading-none tracking-tight group-hover:text-primary-600 transition-colors duration-300">
                                RMP Book
                            </span>
                            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-400 font-black leading-none mt-1.5">
                                Health Engine
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center gap-1.5 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100/50 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <NavLink key={link.name + link.path} to={link.path}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* DESKTOP ACTIONS */}
                    <div className="hidden md:flex items-center gap-5">
                        {user ? (
                            <div className="flex items-center gap-5">
                                {/* Notification Bell */}
                                <button className="relative p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                                    <FaBell className="text-xl" />
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                                </button>

                                {/* Profile Trigger */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-2xl border border-slate-100 bg-white hover:border-primary-100 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 group"
                                    >
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm ${user.role === 'doctor' ? 'bg-emerald-500' : 'bg-primary-600'}`}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-sm font-bold text-slate-700 leading-none group-hover:text-primary-600 transition-colors">{user.name.split(' ')[0]}</span>
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mt-1">{user.role}</span>
                                        </div>
                                    </button>

                                    <NavDropdown
                                        user={user}
                                        isOpen={showProfileDropdown}
                                        onClose={() => setShowProfileDropdown(false)}
                                        onLogout={handleLogout}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="px-6 py-3 rounded-2xl text-slate-600 font-bold hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-8 py-3.5 rounded-2xl bg-primary-600 text-white font-bold shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                                >
                                    Sign Up Free
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        onClick={toggleMobile}
                        className="md:hidden relative z-50 p-2 text-gray-600 hover:text-primary focus:outline-none"
                    >
                        {isMobileOpen
                            ? <FaTimes className="text-2xl" />
                            : <FaBars className="text-2xl" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Drawer Component */}
            <MobileDrawer
                isOpen={isMobileOpen}
                onClose={closeMobile}
                user={user}
                onLogout={handleLogout}
            />
        </>
    );
};

export default Navbar;
