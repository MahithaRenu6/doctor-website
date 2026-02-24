import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaSpinner,
    FaUserMd,
    FaArrowLeft,
    FaHospital,
    FaArrowRight,
} from "react-icons/fa";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register(name, email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">

            <Link
                to="/"
                className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow text-sm font-bold"
            >
                <FaArrowLeft /> Back to Home
            </Link>

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center p-20">
                <div className="max-w-lg text-white">
                    <div className="w-20 h-20 bg-primary-600 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-2xl">
                        <FaUserMd />
                    </div>
                    <h1 className="text-5xl font-black mb-6 leading-tight">
                        Experience Better <br /> Healthcare.
                    </h1>
                    <p className="text-slate-400 text-xl">
                        Join our community of patients and doctors today.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-sm">
                                <FaHospital />
                            </div>
                            <span className="text-xl font-black text-slate-900">
                                RMP Book
                            </span>
                        </div>

                        <h2 className="text-3xl font-black text-slate-900">
                            Create Account
                        </h2>
                        <p className="text-slate-500 mt-2">
                            Start your premium healthcare journey
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-xl mb-6 text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* NAME */}
                        <div>
                            <label className="text-sm font-bold text-slate-700">
                                Full Name
                            </label>

                            <div className="relative mt-2">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-bold text-slate-700">
                                Email Address
                            </label>

                            <div className="relative mt-2">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-bold text-slate-700">
                                Password
                            </label>

                            <div className="relative mt-2">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary-500/25"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <>
                                    Get Started Now
                                    <FaArrowRight />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t pt-6">
                        <p className="text-slate-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-primary-600 font-bold hover:text-primary-700"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Register;