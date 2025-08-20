const multer = require('multer');
const path = require ("path");


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req, file, cb)=>{
        const ext = path.extname(file.originalname); // user1.jpg eg:.jpg
        cb(null,`${Date.now()}${ext}`); //e.g: 46544654.jpg
    }
});

const upload = multer({
    storage,
    fileFilter:(req, file, cb)=>{
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if(extname && mimetype){
            return cb(null, true);
        }
        cb(new Error ("only images (JPEG, JPG, PNG are allowded)"))
    },
    limits:{fileSize:5*1024*1024}
});

module.exports = upload