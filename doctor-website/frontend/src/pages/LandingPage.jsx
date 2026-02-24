import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserMd, FaCalendarCheck, FaNotesMedical, FaCheckCircle, FaArrowRight, FaStar, FaClock, FaShieldAlt, FaLock, FaHospital, FaPlay, FaSearch, FaBell } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="font-sans text-slate-900 bg-white">

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-20">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50/50 -skew-x-12 translate-x-1/4 z-0 hidden lg:block"></div>

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-bold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                            </span>
                            Trusted by 10,000+ Patients
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-heading font-black leading-[1.1] text-slate-900 mb-6">
                            Smart <span className="text-primary-600">Healthcare</span> <br />
                            simplified for you.
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                            Skip the waiting room. Connect with verified specialists, book confirmed slots, and manage your health journey in minutes.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/register" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                                Book Now <FaArrowRight />
                            </Link>
                            <button className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                                <FaPlay className="text-primary-600 text-sm" /> How It Works
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-8 grayscale opacity-60">
                            <div className="flex items-center gap-2 font-bold text-slate-400"><FaShieldAlt /> ABDM Secure</div>
                            <div className="flex items-center gap-2 font-bold text-slate-400"><FaCheckCircle /> Govt. Verified</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative hidden lg:block"
                    >
                        {/* Abstract Hero Image Placeholder/Graphic */}
                        <div className="relative z-10 w-full max-w-lg mx-auto aspect-square rounded-[40px] overflow-hidden shadow-2xl rotate-3">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                                alt="Modern Medical Facility"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute -top-10 -right-10 glass p-6 rounded-2xl shadow-xl z-20 animate-float">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                                    <FaUserMd className="text-2xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Top Doctors</p>
                                    <p className="text-2xl font-black text-slate-900">500+</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -left-10 bg-white p-6 rounded-2xl shadow-xl z-20 animate-float" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                                    <FaCalendarCheck className="text-2xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Bookings</p>
                                    <p className="text-2xl font-black text-slate-900">12K+</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-4xl font-heading font-black text-slate-900 mb-4">How it works?</h2>
                        <p className="text-slate-500 text-lg">Our streamlined process makes it easy to get the care you need, when you need it.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Join Our Community", desc: "Create your secure profile in seconds. Your health data is always protected.", icon: <FaUserMd /> },
                            { step: "02", title: "Find Your Expert", desc: "Browse hundreds of verified specialists by specialty, location, or ratings.", icon: <FaSearch /> },
                            { step: "03", title: "Confirm Slot", desc: "Pick a time that fits your schedule and get instant confirmation.", icon: <FaCalendarCheck /> }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-3xl border border-slate-100 relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <div className="text-6xl font-black text-slate-50 absolute top-6 right-6 group-hover:text-primary-50 transition-colors">{item.step}</div>
                                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 text-2xl mb-8 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features (Split) */}
            <section className="py-32 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="h-64 rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" /></div>
                                    <div className="h-40 rounded-3xl bg-primary-600 p-6 text-white">
                                        <FaHospital className="text-4xl mb-4" />
                                        <div className="text-xl font-bold">15+ Specialties</div>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-12">
                                    <div className="h-40 rounded-3xl bg-accent-500 p-6 text-white">
                                        <FaStar className="text-4xl mb-4" />
                                        <div className="text-xl font-bold">4.9 Rating</div>
                                    </div>
                                    <div className="h-64 rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" /></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="text-primary-600 font-black uppercase tracking-widest text-sm mb-4">Why choose us?</div>
                            <h2 className="text-4xl font-heading font-black text-slate-900 mb-8 leading-tight">Patient-centric care <br /> designed for the modern world.</h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Smart Dashboards", desc: "Tailored experiences for both doctors and patients with real-time data.", icon: <FaNotesMedical /> },
                                    { title: "Instant Slot Booking", desc: "No more long wait times or overbooked appointments.", icon: <FaClock /> },
                                    { title: "Secure & Private", desc: "Your health records are encrypted and ABDM compliant.", icon: <FaLock /> }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-primary-600 text-xl border border-slate-100">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h4>
                                            <p className="text-slate-500">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-primary-900 rounded-[40px] p-12 lg:p-24 relative overflow-hidden text-center text-white">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl lg:text-6xl font-heading font-black mb-8">Ready to book your first appointment?</h2>
                            <p className="text-xl text-primary-100 mb-12">Join thousands of people who have simplified their healthcare experience.</p>
                            <Link to="/register" className="bg-white text-primary-900 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition active:scale-95 inline-block">
                                Get Started Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                                    <FaHospital />
                                </div>
                                <span className="text-2xl font-black text-white">RMP Book</span>
                            </div>
                            <p className="max-w-xs leading-relaxed">Making quality healthcare accessible and efficient for everyone, everywhere.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Quick Links</h4>
                            <ul className="space-y-4">
                                <li><Link to="/login" className="hover:text-primary-400">Login</Link></li>
                                <li><Link to="/register" className="hover:text-primary-400">Register</Link></li>
                                <li><span className="hover:text-primary-400 cursor-pointer">Find Doctors</span></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Support</h4>
                            <ul className="space-y-4">
                                <li><span className="hover:text-primary-400 cursor-pointer">Help Center</span></li>
                                <li><span className="hover:text-primary-400 cursor-pointer">Privacy Policy</span></li>
                                <li><span className="hover:text-primary-400 cursor-pointer">Terms of Service</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                        <p>© 2026 RMP Book. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <span className="hover:text-white cursor-pointer transition">Twitter</span>
                            <span className="hover:text-white cursor-pointer transition">LinkedIn</span>
                            <span className="hover:text-white cursor-pointer transition">Instagram</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
