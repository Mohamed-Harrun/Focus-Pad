const express = require('express');
const app = express();
require("dotenv").config()
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const path = require('path')
const cookieParser = require("cookie-parser")
const cors = require('cors');

// Middlewares

app.use(express.json()); // Middleware to parse JSON body
app.use("/uploads", express.static(path.join(__dirname,"uploads")));
app.use(cookieParser());
app.use(cors({
    origin:"*",
    // credentials:true,
}))
app.use("/api/auth",authRoutes);
app.use("/api/notes",notesRoutes);


// require("./db"); // this triggers connection when app starts
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})