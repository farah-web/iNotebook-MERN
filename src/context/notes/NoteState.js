import React, { useState } from 'react'
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const HOST = 'http://localhost:5000'

  const initialNotes = []
  const initialAlertMsg = 'Notes on Cloud'
  const [notes, setNotes] = useState(initialNotes)
  const [alertMsg, setAlertMsg] = useState(initialAlertMsg);

  // GET ALL NOTES
  const getNotes = async () => {

    const response = await fetch(`${HOST}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkOTZlZjg3MGQ4NzM2OWQ0NzNjNzY1In0sImlhdCI6MTY0MjE1ODAzM30.fPeLj0oZGbpVvjU5sv2d0GunY4uLPErvzpMHaaRriFo'
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // ADD A NOTE
  const addNote = async (addedNote) => {
    const { title, description, tag } = addedNote
    const response = await fetch(`${HOST}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkOTZlZjg3MGQ4NzM2OWQ0NzNjNzY1In0sImlhdCI6MTY0MjE1ODAzM30.fPeLj0oZGbpVvjU5sv2d0GunY4uLPErvzpMHaaRriFo'
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = await response.json();
    setNotes(notes.concat(json))

  }

  // UPDATE A NOTE
  const updateNote = async (noteToBeUpdated) => {
    const { _id, title, description, tag } = noteToBeUpdated;
    const response = await fetch(`${HOST}/api/notes/updatenote/${_id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        //'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkOTZlZjg3MGQ4NzM2OWQ0NzNjNzY1In0sImlhdCI6MTY0MjE1ODAzM30.fPeLj0oZGbpVvjU5sv2d0GunY4uLPErvzpMHaaRriFo'
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ _id, title, description, tag })
    })
    const newNotesEdit = JSON.parse(JSON.stringify(notes))
    // console.log(" new notes edit: ", newNotesEdit)
    // const json=response.json();
    const newUpdatedNotes = newNotesEdit.map((curNote) => {
      if (curNote._id === _id) {
        curNote.title = title
        curNote.description = description
        curNote.tag = tag
      }
      return curNote
    })
    console.log("New updated note", newUpdatedNotes)
    setNotes(newUpdatedNotes)
  }

  // DELETE A NOTE
  const deleteNote = async (id) => {
    const response = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        //'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkOTZlZjg3MGQ4NzM2OWQ0NzNjNzY1In0sImlhdCI6MTY0MjE1ODAzM30.fPeLj0oZGbpVvjU5sv2d0GunY4uLPErvzpMHaaRriFo'
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json();
    console.log('DELETE NOTE: ', json)
    const restoredNotes = notes.filter((curElem) => { return curElem._id !== id })
    setNotes(restoredNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, updateNote, alertMsg, setAlertMsg }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
