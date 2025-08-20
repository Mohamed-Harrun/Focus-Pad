// // // Json web token data verify user valid means next process.

// // const jwt = require("jsonwebtoken");

// // const auth = (req,res,next)=>{
// //     console.log("Cookies: ", req.cookies);
// //     const token = req.cookies.token;
// //     if(!token){
// //         return res.status(401).json({message:"Please login to access"});
// //     }
// //         try {
// //             const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //             req.user = decoded
// //             next();
// //         } catch (error) {
// //             res.status(401).json({message:"Invalid token"});
// //         }
    
// // };

// // module.exports = auth;

// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//     console.log("Cookies:", req.cookies); // Add this
//     const token = req.cookies.token;

//     if (!token) {
//         console.log("No token found in cookies");
//         return res.status(401).json({ message: "Please login to access" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded token:", decoded); // Add this
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log("Token verification failed:", error.message);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    console.log("Cookies:", req.cookies);

    const token = req?.cookies?.token; // ✅ safe optional chaining

    if (!token) {
        console.log("No token found");
        return res.status(401).json({ message: "Please login to access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Token error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
