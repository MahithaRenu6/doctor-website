import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import PatientHome from "../components/patient/PatientHome";
import BookAppointment from "../components/patient/BookAppointment";
import MyAppointments from "../components/patient/MyAppointments";
import PatientProfile from "../components/patient/PatientProfile";
import { FaBars } from "react-icons/fa";

const PatientDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("home");
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [message, setMessage] = useState({ type: "", content: "" });

    const fetchAppointments = async () => {
        try {
            const { data } = await axios.get("/api/appointments", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setAppointments(data);
        } catch (error) {
            console.error("Failed to fetch appointments", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Auto-dismiss message
    useEffect(() => {
        if (message.content) {
            const timer = setTimeout(() => setMessage({ type: "", content: "" }), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return <PatientHome user={user} appointments={appointments} />;
            case "book":
                return <BookAppointment onSuccess={fetchAppointments} />;
            case "appointments":
                return <MyAppointments appointments={appointments} />;
            case "profile":
                return <PatientProfile user={user} />;
            default:
                return <PatientHome user={user} appointments={appointments} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
                role="patient"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                logout={logout}
            />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white p-4 shadow-sm flex items-center justify-between">
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">RMP Book</h1>
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
                        <FaBars className="text-xl" />
                    </button>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    {/* Toast Notification */}
                    {message.content && (
                        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg font-bold transform transition-all duration-500 ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {message.content}
                        </div>
                    )}

                    {renderContent()}
                </main>
            </div>

        </div>
    );
};

export default PatientDashboard;
