const express = require("express");
const { createNote, getAllNotes, updateNotes, deleteNote } = require("../controller/notesController");
const auth = require("../middleware/auth")


const router = express.Router();


router.post("/",auth,createNote);
router.get("/",auth,getAllNotes);
router.put("/:id",auth,updateNotes);
router.delete("/:id",auth,deleteNote);

module.exports = router;