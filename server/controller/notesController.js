const db = require("../db");
const createNote = async (req,res)=>{
    try {
        const {note} = req.body;
        console.log(note);
        console.log(req.body);
        console.log("hi");
        const user_id = req.user.id;
        const date = new Date().toISOString().split("T")[0];
        const[result]=await db.query("INSERT INTO notes (user_id, note, date) VALUES (?,?,?)",[user_id,note,date])
        res.status(201).json({message:"Note created", note_id: result.insertId})
    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message});
    }
}
const getAllNotes = async(req,res)=>{
    try {
        const user_id = req.user.id;
        const [notes] = await db.query("SELECT * FROM notes WHERE user_id=?", [user_id]);
        res.json(notes);
    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message});
    }
}
const updateNotes = async(req,res)=>{
    try {
        const {note} = req.body;
        const user_id = req.user.id;
        const note_id = req.params.id;
        const [result] = await db.query("UPDATE notes SET note=? WHERE user_id=? AND note_id=?", [note, user_id, note_id]);
        if(result.affectedRows===0){
            return res.status(404).json({message: "Note not found"});
        }

        res.json({message:"Note Updated"});
    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message});
    }
}
const deleteNote = async(req,res)=>{
 try {
        const user_id = req.user.id;
        const note_id = req.params.id;
        const [result] = await db.query("DELETE FROM notes WHERE user_id=? AND note_id=?", [user_id, note_id]);
        if(result.affectedRows===0){
            return res.status(404).json({message: "Note not found"});
        }

        res.json({message:"Note Deleted"});
    } catch (error) {
        res.status(500).json({message:"Serverr Error", error:error.message});
    }
}   


module.exports={createNote, getAllNotes, updateNotes, deleteNote}