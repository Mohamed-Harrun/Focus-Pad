import { useLocation } from "react-router-dom";
// AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// Create the context
export const AuthContext = createContext(null);

// Create the provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    // const navigate = useNavigate()

    // Fetch current user from backend
    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/me", {
                withCredentials: true,
            });
            setUser(response.data);
        } catch (error) {
            setUser(null);
            console.error("Fetch user error:", error);
        } finally {
            setLoading(false);
        }
    };
//     const fetchUser = async () => {
//     try {
//         const response = await axios.get("http://localhost:5000/api/auth/me", {
//             withCredentials: true,
//         });
//         setUser(response.data);
//     } catch (error) {
//         if (error.response?.status === 401) {
//             // Not logged in – expected
//             setUser(null);
//         } else {
//             console.error("Unexpected error fetching user:", error);
//         }
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchUser = async () => {
//   try {
//     const res = await axios.get("http://localhost:5000/api/auth/me", {
//       withCredentials: true
//     });
//     setUser(res.data.user);
//   } catch (error) {
//     if (error.response?.status !== 401) {
//       console.error("Unexpected error fetching user:", error);
//     }
//     setUser(null);
//   } finally {
//     setLoading(false);
//   }
// };




    // Login function
    const login = async (userData) => {
        try {
            console.log(userData);
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                userData,
                { withCredentials: true }
            );
            await console.log(response.data.message)
            if (response.data.message === "Login successfully") {
                await fetchUser(); // refresh user after login
                return true;
            }
            return false;
        } catch (error) {
            setUser(null);
            console.error("Login error:", error);
            return false;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, {
                withCredentials: true,
            });
            setUser(null);
            // navigate('/');
        } catch (error) {
            setUser(null);
            console.error("Logout error:", error);
        }
    };

    // Fetch user on first render
    useEffect(() => {
        fetchUser();
    }, []);
    // useEffect(() => {
    //         if (location.pathname !== "/login") {
    //             fetchUser();
    //             }
    //     }, [location.pathname]);


    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
