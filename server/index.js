const express = require('express');
const app = express();
require("dotenv").config()
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const path = require('path')
const cookieParser = require("cookie-parser")
const cors = require('cors');

// Middlewares


const allowedOrigins = ["http://localhost:5173"]; 

app.use(cors({
    origin: allowedOrigins,
    credentials: true, 
}));

app.use(express.json()); // Middleware to parse JSON body
app.use("/uploads", express.static(path.join(__dirname,"uploads")));
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/notes",notesRoutes);

// Serve React frontend in production --added
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


// require("./db"); // this triggers connection when app starts
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})