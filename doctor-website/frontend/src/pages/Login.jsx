import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaSpinner,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">

            <Link
                to="/"
                className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow font-bold text-sm"
            >
                <FaArrowLeft /> Back to Home
            </Link>

            {/* LEFT PANEL */}
            <div className="hidden lg:flex w-1/2 bg-primary-900 items-center justify-center p-20">
                <div>
                    <h1 className="text-5xl text-white font-black mb-6">
                        Secure Access to <br /> Your Health.
                    </h1>
                    <p className="text-primary-100 text-xl">
                        Login to manage appointments and medical records.
                    </p>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">

                <motion.div className="max-w-md w-full p-8">

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black">Welcome Back</h2>
                        <p className="text-slate-500">Enter your credentials</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-bold">Email</label>

                            <div className="relative">

                                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-slate-400">
                                    <FaEnvelope />
                                </div>

                                <input
                                    type="email"
                                    required
                                    className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-primary-600"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-bold">Password</label>

                            <div className="relative">

                                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-slate-400">
                                    <FaLock />
                                </div>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full border rounded-xl py-3 pl-12 pr-12 focus:outline-primary-600"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>

                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : <>Sign In <FaArrowRight /></>}
                        </button>

                    </form>

                    <p className="text-center mt-6">
                        Don't have account?{" "}
                        <Link to="/register" className="text-primary-600 font-bold">
                            Create Account
                        </Link>
                    </p>

                </motion.div>

            </div>
        </div>
    );
};

export default Login;