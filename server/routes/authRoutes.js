const express = require("express");
const router = express.Router();
// import register  from '../controller/authController'
// const register = require('../controller/authController')
const { register,login, getCurrentUser,uploadProfileImage,logout } = require("../controller/authController");
const upload = require("../middleware/fileUpload");
const auth = require("../middleware/auth");
router.post("/register",upload.single("profile_image"), register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",auth,getCurrentUser);
router.post("/upload-profile-image",auth, upload.single("profile_image"),uploadProfileImage);


module.exports = router;