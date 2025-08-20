// // import axios from "axios";
// // import { createContext, useEffect, useState } from "react";

// // // export const AuthContext = createContext(null);

// // export const AuthProvider = ({children}) => {
// //     const [user, setUser] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const fetchUser = async()=>{
// //         try {
// //             const response = await axios.get("http://localhost:5000/api/auth/me",{withCredentials:true});
// //             setUser(response.data);
// //             console.log(user);
// //         } catch (error) {
// //             setUser(null);
// //             console.log(error)
// //         }
// //         finally{
// //             setLoading(false)
// //         }
// //     }
// //     const login = async (userData)=>{
// //         try {
// //             const respone = await axios.post("http://localhost:5000/api/auth/login", userData, {withCredentials: true});
// //             if(respone.data.message === "Login successfully"){
// //                 fetchUser()
// //                 return true
// //             }
// //             return false
// //         } catch (error) {
// //             setUser(null);
// //             console.error(error);
// //         }
// //     }
// //     const logout = async ()=>{
// //         try{
// //              await axios.post("http://localhost:5000/api/auth/logout",{},{withCredentials:true});
// //             setUser(null);
// //         }
// //         catch(error){
// //             setUser(null)
// //             console.log("Logut Error:",error);
// //         }
// //     }
// //     useEffect(()=>{
// //         fetchUser();
// //     },[ ])
// //     return <AuthContext.Provider value={{user,login,loading,logout}}>{children}</AuthContext.Provider>
// // }
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext"; // import the context

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const fetchUser = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/auth/me", {
//                 withCredentials: true,
//             });
//             setUser(response.data);
//         } catch (error) {
//             setUser(null);
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const login = async (userData) => {
//         try {
//             const response = await axios.post(
//                 "http://localhost:5000/api/auth/login",
//                 userData,
//                 { withCredentials: true }
//             );
//             if (response.data.message === "Login successfully") {
//                 await fetchUser();
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             setUser(null);
//             console.error(error);
//             return false;
//         }
//     };

//     const logout = async () => {
//         try {
//             await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
//             setUser(null);
//         } catch (error) {
//             setUser(null);
//             console.log("Logout Error:", error);
//         }
//     };

//     useEffect(() => {
//         fetchUser();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, login, loading, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
