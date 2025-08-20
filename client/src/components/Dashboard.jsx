import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Dashboard = () => {
  const [error,setError]=useState("");
  const [notes,setNotes]=useState([]);
  const [note,setNote]=useState("");
  const [editingNoteId,setEditingNoteId]=useState(null);

  const fetchNotes = async ()=>{
    try {
      const response = await axios.get("http://localhost:5000/api/notes", {withCredentials: true});
      setNotes(response.data);
    } catch (error) {
      setError("Failed to fetch notes",error)
    }
  };
  const handleCreateOrUpdate =  async()=>{
    try {
      if(editingNoteId){
        await axios.put(`http://localhost:5000/api/notes/${editingNoteId}`, {note}, {withCredentials:true});
        setEditingNoteId(null);
      }else{
        await axios.post("http://localhost:5000/api/notes", {note}, {withCredentials:true});
      }
      setNote("");
      fetchNotes();
    } catch (error) {
      setError("Failed to save note", error)
    }
  }
  const handleEditNote = (note)=>{
    setNote(note.note);
    setEditingNoteId(note.note_id)
  }
  const handleDeleteNote = async(id)=>{
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`,{withCredentials:true});
      fetchNotes();
    } catch (error) {
      setError("Failed to save note", error)
    }
  }

  useEffect(()=>{
    fetchNotes();
  },[])
  return (
      <div className="dashboard-container">
        <h2 className="dasboard-title">My notes</h2>
        {error && <p className='error'>{error}</p>}
        <div className='notes-input-container'>
          <textarea className='notes-textarea' rows='4' value={note} onChange={(e)=>{setNote(e.target.value)}} />
          <button className='form-button' onClick={handleCreateOrUpdate}>
            {editingNoteId? "Update Note" : "Create Note"}
          </button>
        </div>
        <div className='notes-grid'>
          {notes.length>0 && notes.map((note)=>(
           <div className='notes-card' key={note.id}>
            <p className='notes-text'>{note.note}</p>
            <p className='notes-date'>{note.date}</p>
            <div className='notes-actions'>
              <button className='edit-button' onClick={()=>handleEditNote(note)}>Edit</button>
              <button className='delete-button' onClick={()=>handleDeleteNote(note.note_id)}>Delete</button>
            </div>
          </div> 
          ))}
        </div>
      </div>
      
  )
}

export default Dashboard