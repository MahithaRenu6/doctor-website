import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    // Validate token or just decode if client-side only (less secure)
                    // Ideally, hit /api/auth/me
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const { data } = await axios.get("/api/auth/me", config);
                    setUser({ ...data, token });
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post("/api/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser(data);
        return data;
    };

    const register = async (name, email, password, role) => {
        const { data } = await axios.post("/api/auth/register", { name, email, password, role });
        localStorage.setItem("token", data.token);
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
