const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const register = async (req,res)=>{
    try {
        const{username, password, email, contact} = req.body;
        console.log(username, password, email, contact);
        // validation
        const profile_image = req.file?`/uploads/${req.file.filename}`:null;
        if(!username||!password||!email){
            return res.status(400).json({message:"Username, Email and password are required"});
        }
        // anybody user check exist 
        const [existingUser] = await db.query("SELECT * FROM users WHERE username=? or EMAIL=?",[username, email]);
        console.log(existingUser);
        if (existingUser.length>0){
            return res.status(400).json({message:"username or email already exist"});
        }
        // hashed password (encryption)
        const hashedPassword = await bcrypt.hash(password, 10);
        // Store to database
        const sql = "INSERT INTO users (username, email, contact, password, profile_image) VALUES(?,?,?,?,?)";
        // const [result] = 
        await db.query(sql,[username,email,contact||null,hashedPassword,profile_image]);
        res.status(201).json({message:'user registered successfully'})
    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message})
    }
};

const login =async(req,res)=>{
try {
    const {username, password} = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE username=? OR email=?",[username,username]);
    // console.log(users[0]);
    // check username is available
    if(users.length===0){
        return res.status(400).json({message: "Invalid user details"})
    }
    // password comparison
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid Password"})
    }
    // Generate token
    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    // console.log(token);
    // this need to set to cookie
    // res.cookie("token", token,{
    //     httpOnly:true,
    //     expires: new Date(Date.now()+ Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000)
    // })
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // change to true in production with HTTPS
        sameSite: "lax", // or "none" if using cross-site HTTPS
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000)
    });

    res.status(200).json({message:"Login successfully"})
    console.log("Login successfull")

} catch (error) {
    res.status(500).json({message:"Server Error", error:error.message})
}
}
const getCurrentUser = async(req,res)=>{
    try {
        const user_id = req.user.id;
        const [users] = await db.query("SELECT id,username,email,contact,profile_image FROM users WHERE id=?",[user_id]);
        if(users.length===0){
            return res.status(404).json({message:"Server Error", error:error.message})
        }
        console.log("data of user fetched",users[0]);
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }
}
const uploadProfileImage = async(req,res)=>{
    try {
        const user_id = req.user.id;
        const profile_image = req.file?`/uploads/${req.file.filename}`:null;

        const [result] = await db.query("UPDATE users SET profile_image = ? WHERE id=?",[profile_image,user_id]);
        console.log(result);
        if(result.affectedRows===0){
            return res.status(404).json({message:"User not found"});
        }
        res.json({message:"profile image uploaded",profile_image})

    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }
}
const logout = async (req, res)=>{
    try {
        res.clearCookie("token");
        res.json({message:"Logout successful"});
        console.log("Logout successfull")
    } catch (error) {
        res.status(500).json({message:"server error", error:error.message})
    }
}

module.exports = {register,login,getCurrentUser,uploadProfileImage,logout}